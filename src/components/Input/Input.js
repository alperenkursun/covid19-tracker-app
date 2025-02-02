import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCountries,
  countriesSelector,
  statusSelector,
  errorSelector,
} from "../../redux/countriesSlice/countriesSlice";
import { fetchCountryCovidData } from "../../redux/covidSlice/covidSlice";

function Input() {
  const dispatch = useDispatch();
  const countries = useSelector(countriesSelector);
  const status = useSelector(statusSelector);
  const error = useSelector(errorSelector);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCountries());
    }
  }, [status, dispatch]);

  const handleCountryChange = (event) => {
    const selectedCountry = event.target.value;
    dispatch(fetchCountryCovidData(selectedCountry));
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="dropdown-container">
      <select
        className="dropdown"
        onChange={handleCountryChange}
        defaultValue=""
      >
        <option value="" disabled>
          Select a country
        </option>
        {countries.map((country, index) => (
          <option key={index} value={country.name.common}>
            {country.name.common}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Input;
