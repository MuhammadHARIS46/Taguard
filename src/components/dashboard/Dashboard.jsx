/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "./styles.css";
import axios from "axios";
import Card from "./Card";
import SampleUser from "../../assets/SampleUser.png";
import SampleBg from "../../assets/SampleBg.svg";
import DetailCard from "./DetailCard";
import Search from "../../assets/Search.svg";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { InfluxDB } from "@influxdata/influxdb-client";
function Dashboard() {
  const [groups, setGroups] = useState([]);
  const [mappedGroups, setMappedGroups] = useState([]);
  const [userDb, setUserDb] = useState([]);
  const [deviceMacs, setDeviceMacs] = useState([]);
  const token = localStorage.getItem("jwt");

  const tblSensorGroup = async () => {
    try {
      const res = await axios.get(
        "https://endpoint.careafox.com/api/list/tblSensorGroup",
        {
          headers: {
            "X-Authorization": `${token}`,
          },
        }
      );
      setGroups(res?.data.tblSensorGroup);
      // console.log("tblSensorGroup", res?.data.tblSensorGroup);
      return res;
    } catch (err) {
      console.log(err);
    }
  };
  const deviceMac = async () => {
    const token = localStorage.getItem("jwt");
    try {
      const res = await axios.get(
        "https://endpoint.careafox.com/api/list/device_mac",
        {
          headers: {
            "X-Authorization": `${token}`,
          },
        }
      );

      // console.log("device_mac", res?.data?.device_mac);
      setDeviceMacs(res?.data?.device_mac);
    } catch (err) {
      console.log(err);
    }
  };
  const viewUserDb = async () => {
    try {
      const userDbResponse = await axios.get(
        "https://endpoint.careafox.com/api/list/view_user_db",
        {
          headers: {
            "X-Authorization": `${token}`,
          },
        }
      );
      // console.log("userDB", userDbResponse.data.view_user_db);
      setUserDb(userDbResponse.data.view_user_db);
    } catch (err) {
      return err;
    }
  };
  const getGroupQueryPromise = async (devices) => {
    const queryPromises = userDb.map((device) => {
      const { device_mac, influx_server_url, influx_token, influx_org } =
        device;

      const query = `
          from(bucket: "general")
          |> range(start:-15m, stop: -1s)
          |> filter(fn: (r) => r["_measurement"] == "mem")
          |> filter(fn: (r) => r["_field"] == "device_temperature")
          |> filter(fn: (r) => r["device_mac"] == "${device_mac}")
          |> aggregateWindow(every: 15m, fn: mean, createEmpty: false)
          |> yield(name: "mean")
        `;

      return new Promise(async (resolve, reject) => {
        try {
          const queryApi = await new InfluxDB({
            url: influx_server_url,
            token: influx_token,
          }).getQueryApi(influx_org);

          const resultData = [];

          await queryApi.queryRows(query, {
            next(row, tableMeta) {
              const o = tableMeta.toObject(row);
              resultData.push(o);
            },
            error(error) {
              console.log(`Query failed for device ${device_mac}:`, error);
              reject(error);
            },
            complete() {
              // console.log(`Result data for device ${device_mac}:`, resultData);
              resolve({
                name: device_mac,
                data: resultData.map((data) => ({
                  x: new Date(data._time).toISOString(),
                  y: data._value,
                })),
              });
            },
          });
        } catch (error) {
          console.error(
            `Error in influxQuery for device ${device_mac}:`,
            error
          );
          reject(error);
        }
      });
    });

    return Promise.all(queryPromises);
  };

  const updateMappedGroups = () => {
    const onlineDevices = new Set();
    const onlineDeviceMacs = new Set();

    getGroupQueryPromise().then((results) => {
      results.forEach((result) => {
        if (result.data.length > 0) {
          onlineDevices.add(result.name);
          result.data.forEach((device) => {
            onlineDeviceMacs.add(device.device_mac);
          });
        }
      });

      const updatedMappedGroups = groups.reduce((result, group) => {
        const devicesInGroup = userDb.filter(
          (device) => device.group_id === group.id
        );
        const onlineCount = devicesInGroup.filter((device) =>
          onlineDevices.has(device.device_mac)
        ).length;
        const offlineCount = devicesInGroup.length - onlineCount;
        const macDevices = deviceMacs.filter(
          (device) => device?.group_id === group.id
        );
        // console.log("macDevices,", macDevices);
        // console.log("devicesInGroup,", devicesInGroup);

        const groupWithDevices = {
          group,
          deviceCount: devicesInGroup.length,
          onlineCount,
          offlineCount,
          devices: devicesInGroup,
          deviceMacs: macDevices,
        };

        result.push(groupWithDevices);

        return result;
      }, []);

      setMappedGroups(updatedMappedGroups);
      setDeviceMacs(Array.from(onlineDeviceMacs));

      console.log("Updated Mapped Groups:", updatedMappedGroups);
    });
  };

  useEffect(() => {
    tblSensorGroup()
    deviceMac()
    viewUserDb()
  }, []);
  useEffect(() => {
    updateMappedGroups()
  }, []);
  

  return (
    <div className="dashboardMain">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "30px",
        }}
      >
        <div className="search-container">
          <img src={Search} alt="Search Icon" />
          <input className="search-input" type="text" placeholder="Search" />
        </div>
      </div>
      <div
        style={{
          display: "flex",
        }}
      >
        <div className="cardsWrapper">
          <div className="cardGrid">
            <Card
              bgImg={SampleBg}
              name="Haris"
              time="9999"
              ProfileImg={SampleUser}
              Loc="Jaipur"
            />
            <Card
              bgImg={SampleBg}
              name="Haris"
              time="9999"
              ProfileImg={SampleUser}
              Loc="Jaipur"
            />
            <Card
              bgImg={SampleBg}
              name="Haris"
              time="9999"
              ProfileImg={SampleUser}
              Loc="Jaipur"
            />
          </div>
          {mappedGroups?.map((group, index) => (
            <div key={index + 2}>
              <p
                key={index}
                style={{
                  background: "black",
                  color: "white",
                  padding: "5px",
                  borderRadius: "5px",
                }}
              >
                {group.group.groupName}
              </p>
              <div className="cardGrid">
                {group?.devices?.map((device, index) => (
                  <DetailCard
                    key={index}
                    deviceNo={device.device_mac}
                    city={device.location_name}
                    Ip={device.device_name}
                    temp={
                      device.device_temperature === null
                        ? "Not available"
                        : device.device_temperature
                    }
                    humidity={
                      device.device_humidity === null
                        ? "Not available"
                        : device.device_humidity
                    }
                    ProfileImg={SampleUser}
                    lastSeen={
                      device.last_updated
                        // ? new Date(device.last_updated).toLocaleDateString(
                        //     "en-US",
                        //     {
                        //       day: "numeric",
                        //       month: "long",
                        //       year: "numeric",
                        //     }
                        //   )
                        // : "Not available"
                    }
                  />
                ))}
              </div>
            </div>
          ))}

        </div>

        <div className="sideCard">
          {mappedGroups?.map((i, index) => (
            <div className="sideCardContentWrapper" key={index}>
              <p>{i?.group?.groupName}</p>
              <div className="sideCarddetailWrap">
                <div className="spaceBet">
                  <p
                    className="sidecardContentTypo"
                    style={{
                      color: "white",
                    }}
                  >
                    Online
                  </p>
                  <p
                    className="sidecardContentTypo"
                    style={{
                      color: "#D9DBE9",
                    }}
                  >
                    {i.onlineCount}
                  </p>
                </div>
                <div className="spaceBet">
                  <p
                    className="sidecardContentTypo"
                    style={{
                      color: "white",
                    }}
                  >
                    Offline
                  </p>
                  <p
                    className="sidecardContentTypo"
                    style={{
                      color: "#D9DBE9",
                    }}
                  >
                    {i.offlineCount}
                  </p>
                </div>
                <div className="spaceBet">
                  <p
                    className="sidecardContentTypo"
                    style={{
                      color: "white",
                    }}
                  >
                    Breaches
                  </p>
                  <p
                    className="sidecardContentTypo"
                    style={{
                      color: "#D9DBE9",
                    }}
                  >
                    340
                  </p>
                </div>
                <div className="spaceBet">
                  <p
                    className="sidecardContentTypo"
                    style={{
                      color: "white",
                    }}
                  >
                    Alerts
                  </p>
                  <p
                    className="sidecardContentTypo"
                    style={{
                      color: "#D9DBE9",
                    }}
                  >
                    234
                  </p>
                </div>
              </div>
              <div className="circularbarWrap">
                <div className="barAndTypoWrap">
                  <CircularProgressbar
                    value="22"
                    text="22"
                    styles={buildStyles({
                      rotation: 0.25,
                      strokeLinecap: "butt",
                      textSize: "24px",
                      pathTransitionDuration: 0.5,
                      pathColor: `#287287B`,
                      textColor: "white",
                      trailColor: "#ED2E7E",
                    })}
                  />
                  <p>RACK1</p>
                </div>
                <div className="barAndTypoWrap">
                  <CircularProgressbar
                    value="22"
                    text="22"
                    styles={buildStyles({
                      rotation: 0.25,
                      strokeLinecap: "butt",
                      textSize: "24px",
                      pathTransitionDuration: 0.5,
                      pathColor: "white",
                      textColor: "white",
                      trailColor: "#6E7191",
                    })}
                  />
                  <p>RACK2</p>
                </div>
                <div className="barAndTypoWrap">
                  <CircularProgressbar
                    value="22"
                    text="22"
                    styles={buildStyles({
                      rotation: 0.25,
                      strokeLinecap: "butt",
                      textSize: "24px",
                      pathTransitionDuration: 0.5,
                      pathColor: "white",
                      textColor: "white",
                      trailColor: "#6E7191",
                    })}
                  />
                  <p>LOWER DECK</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
