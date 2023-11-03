/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "./styles.css";
import axios from "axios";
import Card from "./Card";
import SampleUser from "../../assets/SampleUser.png";
import SampleBg from "../../assets/SampleBg.svg";
import DetailCard from "./DetailCard";
import Search from "../../assets/Search.svg";
function GrafanaDashboard() {
  const ListLocations = async () => {
    try {
      const response = await axios.get(
        "https://mobile.careafox.com/api/list/tblLocations",

      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    ListLocations();
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
  );
}

export default GrafanaDashboard;
