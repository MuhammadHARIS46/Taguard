import React from "react";
import ReactApexChart from "react-apexcharts";

const CardChart = ({ mac, temp, bgColor, sampleData, lineColor, areaColor }) => {
  const options = {
    series: [
      {
        name: "XYZ MOTORS",
        data: sampleData,
      },
    ],
    chart: {
      type: "area",
      stacked: false,
      height: 350,
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: true,
      },
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
      colors: [areaColor], // Set the area color here
    },
    yaxis: {
      show: false, // Hide Y-axis labels
    },
    xaxis: {
      labels: {
        show: false, // Hide X-axis labels
      },
    },
    grid: {
      show: false, // Hide grid lines
    },
    tooltip: {
      shared: false,
      y: {
        formatter: function (val) {
          return (val / 1000000).toFixed(0);
        },
      },
    },
    stroke: {
      width: 2,
      colors: [lineColor], // Set the line color here
    },
  };

  return (
    <div className="chartWrap" style={{ width: "300px", background: bgColor }}>
      <div
        style={{
          padding: "5px",
        }}
      >
        <p
          style={{
            fontSize: "25px",
            fontWeight: 400,
          }}
        >
          {mac}
        </p>
        <p
          style={{
            fontSize: "40px",
            fontWeight: 600,
          }}
        >
          {temp}
        </p>
      </div>

      <div id="chart">
        <ReactApexChart
          options={options}
          series={options.series}
          type="area"
          height={options.chart.height}
        />
      </div>
    </div>
  );
};

export default CardChart;
