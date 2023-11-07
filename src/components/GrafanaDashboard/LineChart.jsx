import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import "./styles.css"
const LineChart = () => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Line 1",
        data: [28, 29, 33, 36, 32, 32, 33],
        color: "#77B6EA",
      },
      {
        name: "Line 2",
        data: [12, 11, 14, 18, 17, 13, 13],
        color: "#545454",
      },
      {
        name: "Line 3",
        data: [15, 18, 22, 25, 29, 28, 26],
        color: "red",
      },
      {
        name: "Line 4",
        data: [8, 10, 14, 16, 12, 15, 13],
        color: "green",
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        dropShadow: {
          enabled: true,
          color: "#000",
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2,
        },
        toolbar: {
          show: true,
          tools: {
            zoom: false,
            zoomin: false,
            zoomout: false,
            selection: false,
            pan: false,
            reset:false
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Average High & Low Temperature",
        align: "left",
      },
      grid: {
        borderColor: "#e7e7e7",
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5,
        },
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        title: {
          text: "Month",
        },
      },
      yaxis: {
        title: {
          text: "Temperature",
        },
        min: 5,
        max: 40,
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    },
  });

  return (
    <div id="chart" className="chartWrap">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series.map((data) => ({
          name: data.name,
          data: data.data,
        }))}
        type="line"
        height={350}
      />
    </div>
  );
};

export default LineChart;
