/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import LineChart from "./LineChart";
import Search from "../../assets/Search.svg";
import Sidebar from "../sidebar/Sidebar";
import HeatmapChart from "./HeatMap";
import CardChart from "./CardChart";
import "./styles.css";
import mqtt from "mqtt";
import SingleLineChart from "./SingleLineChart";
import axios from "axios"
const GrafanaDashbaord = () => {
  const username = "admin";
  const password = "o99Y7YndJy0YwNlW3DkC9DZk0";
  const brokerUrl = "ws://tag4track.com:8083/mqtt";

  const [topic, setTopic] = useState([]);
  const historicData = async() =>{
    try{
      const response = await axios.get("https://tag4track.com/api/v1/general_h.php?start_time=-9h&token=cuK9CEh9rokte_1uDQXkushwbltnFfFHRXHOV3q1IO2_NgzPZMF2je8a6O73Y30_C46oYfTLq1_fP6sPhPnjrw==&device_mac=BC5729009415&bucket=general&end_time=-1s")
      console.log(response)
    }
    catch(err) {
      console.log(err)
    }
  }
  
  useEffect(() => {
    const client = mqtt.connect(brokerUrl, {
      clientId: "emqx_ODY3MD",
      username: username,
      password: password,
    });

    client.on("connect", () => {
      console.log("Connected to MQTT broker");
      const topic2 = "kbeacon/publish/94A408B91ABC";

      client.subscribe(topic2, (err) => {
        if (!err) {
          console.log(`Subscribed to topic: ${topic2}`);
        }
      });
    });

    client.on("message", (topic2, message) => {
      try {
        const parsedMessage = JSON.parse(message.toString());

        if (parsedMessage.obj) {
          // console.log(`Received message on topic ${topic2}:`, parsedMessage.obj);
          setTopic(parsedMessage.obj);
        } else {
          console.log(
            `Received message on topic ${topic2} does not contain an 'obj' property.`
          );
        }
      } catch (error) {
        console.error(`Error parsing message on topic ${topic2}:`, error);
      }
    });

    client.on("error", (err) => {
      console.error("MQTT error:", err);
    });
    historicData()
    return () => {
      client.end();
    };
  }, []);
  return (
    <div className="grafanaMain">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <Sidebar />
        <div className="search-Box">
          <img
            src={Search}
            alt="Search Icon"
            style={{
              marginLeft: "10px",
            }}
          />
          <input className="search-input" type="text" placeholder="Search" />
        </div>
        <div
          style={{
            visibility: "hidden",
          }}
        >
          <Sidebar />
        </div>
      </div>
      <div>
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "30px",
            alignItems: "center",
            width: "100%",
            flexWrap: "wrap",
          }}
        >
          {topic?.slice(0, 6).map((i, index) => (
            <div key={index}>
              <CardChart
                mac={i.dmac}
                temp={`${i.temp}°C`}
                humidity={`${i.humidty}%`}
                bgColor="#c26786"
                lineColor="#e8d3da"
                areaColor=" #e3b6c5"
                sampleData={[
                  [26, 30.95],
                  [76, 22.34],
                  [45, 12.18],
                ]}
              />
            </div>
          ))}
        </div>
        <div>
          <LineChart />
        </div>
        <div
          style={{
            marginTop: "30px",
          }}
        >
          <HeatmapChart />
        </div>
        <div
          style={{
            marginTop: "30px",
          }}
        >
          <SingleLineChart data={topic} />
        </div>
      </div>
    </div>
  );
};
export default GrafanaDashbaord;
