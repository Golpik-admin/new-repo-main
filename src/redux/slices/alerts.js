import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  alerts: [],
  loading: true,
  errors: null,
};
export const url = process.env.REACT_APP_ALERTS_API;
export const fetchAlerts = createAsyncThunk("alerts/fetchAlerts", async () => {
  const response = await axios
    .get(`${url}`)
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
  return response;
});

export const alertSlice = createSlice({
  name: "alertsList",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlerts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAlerts.fulfilled, (state, action) => {
        state.loading = false;
        state.alerts = [];
        state.alerts = action.payload;
      })
      .addCase(fetchAlerts.rejected, (state, action) => {
        state.loading = false;
        state.alerts = [];
        state.errors = action.error.message;
      });
  },
});
export default alertSlice.reducer;
