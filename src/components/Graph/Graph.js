import React from "react";
import { useSelector } from "react-redux";
import {
  globalDataSelector,
  countryDataSelector,
  covidStatusSelector,
  covidErrorSelector,
} from "../../redux/covidSlice/covidSlice";

import Chart from "react-apexcharts";

const Graph = () => {
  const globalData = useSelector(globalDataSelector);
  const countryData = useSelector(countryDataSelector);
  const status = useSelector(covidStatusSelector);
  const error = useSelector(covidErrorSelector);

  const dataToDisplay =
    countryData && Object.keys(countryData).length > 0
      ? countryData
      : globalData;

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }

  if (!dataToDisplay || Object.keys(dataToDisplay).length === 0) {
    return <p>No data available.</p>;
  }

  const options = {
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
        distributed: true,
      },
    },
    colors: ["#add8e6", "#98ff98", "#ff6f61", "#fffacd"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: ["Infected", "Recovered", "Deaths", "Active"],
    },
    yaxis: {
      title: {
        text: "Number of Cases",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val.toLocaleString();
        },
      },
    },
  };

  const series = [
    {
      name: "Cases",
      data: [
        dataToDisplay.cases || 0,
        dataToDisplay.recovered || 0,
        dataToDisplay.deaths || 0,
        dataToDisplay.active || 0,
      ],
    },
  ];

  return (
    <div className="chart-container">
      <Chart
        options={options}
        series={series}
        type="bar"
        width={800}
        height={350}
      />
    </div>
  );
};

export default Graph;
