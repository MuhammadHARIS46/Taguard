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
function Dashboard() {
  // const ListLocations = async () => {
  //   const token = localStorage.getItem("jwt");
  //   try {
  //     const response = await axios.get(
  //       "https://mobile.careafox.com/api/list/view_user_db",
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     console.log(response);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // useEffect(() => {
  //   ListLocations();
  // }, []);
  const sideCardData = [
    {
      city: "Mumbai",
      Online: "100,000",
      Offline: "5",
      Breaches: "8",
      Alerts: "25",
      c1Val: 40,
      c1Text: "N100K",
      c2Val: 60,
      c2Text: "60%",
      c3Val: 40,
      c3Text: "40%",
    },
    {
      city: "NOIDA",
      Online: "100,000",
      Offline: "5",
      Breaches: "8",
      Alerts: "25",
      c1Val: 40,
      c1Text: "N100K",
      c2Val: 60,
      c2Text: "60%",
      c3Val: 40,
      c3Text: "40%",
    },
    {
      city: "GURUGRAM",
      Online: "100,000",
      Offline: "5",
      Breaches: "8",
      Alerts: "25",
      c1Val: 40,
      c1Text: "N100K",
      c2Val: 60,
      c2Text: "60%",
      c3Val: 40,
      c3Text: "40%",
    },
  ];


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
          <div className="cardGrid">
            <DetailCard
              deviceNo="heee"
              status="active"
              Ip="RTU 01"
              temp="8C"
              humidity="97%"
              lastSeen="12 Aug 2023"
              Loc="Gidi Fest: Bringing It Home Festival"
              city="Mumbai"
              address="26B Forest Hill Drive"
              time="14:00 | 08 FEB, 2021"
              ProfileImg={SampleUser}
            />
            <DetailCard
              deviceNo="heee"
              status="active"
              Ip="RTU 01"
              temp="8C"
              humidity="97%"
              lastSeen="12 Aug 2023"
              Loc="Gidi Fest: Bringing It Home Festival"
              city="Mumbai"
              address="26B Forest Hill Drive"
              time="14:00 | 08 FEB, 2021"
              ProfileImg={SampleUser}
            />
          </div>
        </div>

        <div className="sideCard">
          {sideCardData?.map((i, index) => (
            <div className="sideCardContentWrapper" key={index}>
              <p>{i.city}</p>
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
                    {i.Online}
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
                    {i.Offline}
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
                    {i.Breaches}
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
                    {i.Alerts}
                  </p>
                </div>
              </div>
              <div className="circularbarWrap">
                <div className="barAndTypoWrap">
                  <CircularProgressbar
                    value={i.c1Val}
                    text={i.c1Text}
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
                    value={i.c2Val}
                    text={i.c2Text}
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
                    value={i.c3Val}
                    text={i.c3Text}
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
