import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  alerts: [],
  loading: false,
  error: null,
};
const url =
  "https://optionizedevfunctions.azurewebsites.net/api/Alerts/6372c6c0a8b2c2ec60b2da52/null/null/TextForAccessToken";

export const fetchAlerts = createAsyncThunk("alerts/fetchAlerts", async () => {
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": true,
  };
  const response = await axios
    .get(`${url}`, {
      headers,
    })
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
  console.log(response,'response');
});

export const alertSlice = createSlice({
  name: "alertApi",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlerts.pending, (state) => {
        state.loading = false;
      })
      .addCase(fetchAlerts.fulfilled, (state, action) => {
        state.loading = true;
        state.alerts = [];
        state.alerts = action.payload;
      })
      .addCase(fetchAlerts.rejected, (state, action) => {
        state.loading = false;
        state.alerts = [];
        state.error = action.error.message;
      });
  },
});
export default alertSlice.reducer;
