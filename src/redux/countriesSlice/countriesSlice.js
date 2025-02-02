import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCountries = createAsyncThunk(
  "countries/fetchCountries",
  async () => {
    const response = await axios.get(
      "https://restcountries.com/v3.1/all?fields=name"
    );
    const sortedCountries = response.data.sort((a, b) =>
      a.name.common.localeCompare(b.name.common)
    );
    return sortedCountries;
  }
);

const countriesSlice = createSlice({
  name: "countries",
  initialState: {
    countries: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.countries = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const countriesSelector = (state) => state.countries.countries;
export const statusSelector = (state) => state.countries.status;
export const errorSelector = (state) => state.countries.error;

export default countriesSlice.reducer;
