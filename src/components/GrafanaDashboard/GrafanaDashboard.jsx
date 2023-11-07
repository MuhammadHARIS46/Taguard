import React from "react";
import LineChart from "./LineChart";
import Search from "../../assets/Search.svg";
import Sidebar from "../sidebar/Sidebar";
import HeatmapChart from "./HeatMap";
import CardChart from "./CardChart";
import "./styles.css";
const GrafanaDashbaord = () => {
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
          }}
        >
          <CardChart
            mac="3R804-FCD6"
            temp="33 C"
            bgColor="#c26786"
            lineColor="#e8d3da"
            areaColor=" #e3b6c5"
            sampleData={[
              [13279600000, 30.95],
              [-132746000000, 22.34],
              [1327400000, 12.18],
            ]}
          />
          <CardChart
            mac="3R807-FC7F"
            temp="25 C"
            bgColor="#78BF9F"
            lineColor="#D8F0E5"
            areaColor=" #B6E3CF"
            sampleData={[
              [23456, 30.95],
              [-786, -22.34],
              [2378, 12.18],
            ]}
          />
          <CardChart
            mac="3R907-FC8F"
            temp="35 C"
            bgColor="#bd5e5e"
            lineColor="#e6c3c3"
            areaColor="#bf7878"
            sampleData={[
              [22, 30.95],
              [12, 7.34],
              [28, -21.18],
            ]}
          />
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
      </div>
    </div>
  );
};
export default GrafanaDashbaord;
