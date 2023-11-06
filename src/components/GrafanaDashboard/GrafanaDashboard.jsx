import React from "react";
import LineChart from "./LineChart";
import Search from "../../assets/Search.svg";
import Sidebar from "../sidebar/Sidebar"
import HeatmapChart from "./HeatMap"
import "./styles.css"
const GrafanaDashbaord = () => {
  return (
    <div className="grafanaMain">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Sidebar />
        <div className="search-Box">
          <img src={Search} alt="Search Icon"  style={{
            marginLeft:"10px"
          }}/>
          <input className="search-input" type="text" placeholder="Search" />
        </div>
      </div>
      <LineChart />
      <div style={{
        marginTop:"30px"
      }}>
      <HeatmapChart />

      </div>
    </div>
  );
};
export default GrafanaDashbaord;
