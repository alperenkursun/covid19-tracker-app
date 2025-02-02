import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCovidData = createAsyncThunk(
  "covid/fetchCovidData",
  async () => {
    const response = await axios.get("https://disease.sh/v3/covid-19/all");
    return response.data;
  }
);

export const fetchCountryCovidData = createAsyncThunk(
  "covid/fetchCountryCovidData",
  async (country) => {
    const response = await axios.get(
      `https://disease.sh/v3/covid-19/countries/${country}`
    );
    return response.data;
  }
);

const covidSlice = createSlice({
  name: "covid",
  initialState: {
    covidData: {},
    countryData: {},
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCovidData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCovidData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.covidData = action.payload;
      })
      .addCase(fetchCovidData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchCountryCovidData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCountryCovidData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.countryData = action.payload;
      })
      .addCase(fetchCountryCovidData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const globalDataSelector = (state) => state.covid.covidData;
export const countryDataSelector = (state) => state.covid.countryData;
export const covidStatusSelector = (state) => state.covid.status;
export const covidErrorSelector = (state) => state.covid.error;

export default covidSlice.reducer;
