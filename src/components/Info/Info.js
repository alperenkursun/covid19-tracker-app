import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCovidData,
  globalDataSelector,
  countryDataSelector,
  covidStatusSelector,
  covidErrorSelector,
} from "../../redux/covidSlice/covidSlice";

function Info() {
  const dispatch = useDispatch();
  const globalData = useSelector(globalDataSelector);
  const countryData = useSelector(countryDataSelector);
  const status = useSelector(covidStatusSelector);
  const error = useSelector(covidErrorSelector);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCovidData());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }

  const dataToDisplay =
    countryData && Object.keys(countryData).length > 0
      ? countryData
      : globalData;

  if (!dataToDisplay || Object.keys(dataToDisplay).length === 0) {
    return <p>No data available.</p>;
  }

  const lastUpdated = new Date(dataToDisplay.updated).toLocaleString();
  const location =
    countryData && Object.keys(countryData).length > 0
      ? dataToDisplay.country
      : "Global";

  return (
    <div className="info">
      <div className="info-item">
        <h2>Infected</h2>
        <h3>{dataToDisplay.cases?.toLocaleString()}</h3>
        <h4>Last Updated at:</h4>
        <p className="date">{lastUpdated}</p>
        <p>Number of infections from COVID-19</p>
        <p>{location}</p>
      </div>
      <div className="info-item">
        <h2>Recovered</h2>
        <h3>{dataToDisplay.recovered?.toLocaleString()}</h3>
        <h4>Last Updated at:</h4>
        <p className="date">{lastUpdated}</p>
        <p>Number of recoveries from COVID-19</p>
        <p>{location}</p>
      </div>
      <div className="info-item">
        <h2>Deaths</h2>
        <h3>{dataToDisplay.deaths?.toLocaleString()}</h3>
        <h4>Last Updated at:</h4>
        <p className="date">{lastUpdated}</p>
        <p>Number of deaths caused by COVID-19</p>
        <p>{location}</p>
      </div>
      <div className="info-item">
        <h2>Active</h2>
        <h3>{dataToDisplay.active?.toLocaleString()}</h3>
        <h4>Last Updated at:</h4>
        <p className="date">{lastUpdated}</p>
        <p>Number of active COVID-19 cases</p>
        <p>{location}</p>
      </div>
    </div>
  );
}

export default Info;
