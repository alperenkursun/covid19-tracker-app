import { configureStore } from "@reduxjs/toolkit";
import countriesSlice from "./countriesSlice/countriesSlice";
import covidSlice from "./covidSlice/covidSlice";

export const store = configureStore({
  reducer: {
    countries: countriesSlice,
    covid: covidSlice,
  },
});
