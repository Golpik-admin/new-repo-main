import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiEndpoint } from "../../config";

const initialState = {
  alerts: [],
  loading: true,
  errors: null,
  processedAlertsCount: 0,
  unprocessedAlertsCount: 0,
  expiredAlertsCount: 0,
};
const userId = "6372c6c0a8b2c2ec60b2da52";
const startDate = null;
const endDate = null;
export const fetchAlerts = createAsyncThunk(
  "alerts/fetchAlerts",
  async (args = null) => {
    const response = await axios
      .get(
        `${apiEndpoint}/Alerts/${userId}/${startDate}/${endDate}/TextForAccessToken`,
        {
          params: {
            status: args !== null && args !== "all" ? args.status : null,
            count: args !== null ? args.count : null,
          },
        }
      )
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        return error;
      });
    return response;
  }
);

export const alertSlice = createSlice({
  name: "alertsList",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchAlerts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAlerts.fulfilled, (state, action) => {
      if (
        action.payload.Status !== undefined &&
        action.payload.Status === "Expired"
      ) {
        state.expiredAlertsCount = action.payload.Count;
      }
      if (
        action.payload.Status !== undefined &&
        action.payload.Status === "Unprocessed"
      ) {
        state.unprocessedAlertsCount = action.payload.Count;
      }
      if (
        action.payload.Status !== undefined &&
        action.payload.Status === "Processed"
      ) {
        state.processedAlertsCount = action.payload.Count;
      }
      if (action.payload.Status === undefined) {
        state.loading = false;
        state.alerts = [];
        state.alerts = action.payload;
      }
    });
    builder.addCase(fetchAlerts.rejected, (state, action) => {
      state.loading = false;
      state.alerts = [];
      state.errors = action.error.message;
    });
  },
});
export default alertSlice.reducer;
