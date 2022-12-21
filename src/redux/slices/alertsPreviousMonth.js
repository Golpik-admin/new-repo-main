import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiEndpoint } from "../../config";
axios.defaults.headers.common["Authorization"] =
  "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIiwiaXNzIjoiaHR0cHM6Ly9kZXYtYzM3c3M0dDcxdHJzY2Vjei51cy5hdXRoMC5jb20vIn0..BpIko-SWHZajAYQb.SXnqG7qVi6o59_RcU8_c8qEB1P-7bLSk-7OA7LI6OyJXzgVXJ8pyTQIsvD4XFBPXhk4Y6_PXG9eTeXbYeYImevlz6NlxvW4oYKna11Htvwyciq_kmFIVg9WLmviiPNkrMThZR9-TdtUhevp9tFMe7MOY60a6xhn8Q7L1V7vpE6D0dlUx51NrgesDqN0FWy18qXMVX2OCtZ922mj2ll2q8idNPEyUHoBA0kEI-nR_GCBxMVjBwluGZX5l9neLfSYdpsk4FeCpJNhtmTYArc2w_IJ4XmB0TkfDqVPSwfuLW9X_9MC4dhoHCIzEkFxcFZ0Ag9p7bH7T_ngJKGIMHRNtbmW6.FQDuw0Ia_gzhWZwsxOLkZQ";

const initialState = {
  alertsPreviousMonth: [],
  loading: true,
  errors: null,
  previousProcessedAlertsCount: 0,
  previousUnprocessedAlertsCount: 0,
  previousExpiredAlertsCount: 0,
  previousTotalAlertsCount: 0,
};
// const userId = "6372c6c0a8b2c2ec60b2da52";
export const previousFetchAlerts = createAsyncThunk(
  "alertsPreviousMonth/previousFetchAlerts",
  async (args = null) => {
    const startDate =
      args !== null && args.startDate !== undefined ? args.startDate : null;
    const endDate =
      args !== null && args.endDate !== undefined ? args.endDate : null;
    const response = await axios
      .get(`${apiEndpoint}Alerts/${args.userId}/${startDate}/${endDate}`, {
        params: {
          status: args !== null && args.status !== "all" ? args.status : null,
          count: args !== null ? args.count : null,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        return error;
      });

    return response;
  }
);

export const previousAlertSlice = createSlice({
  name: "previousAlertsList",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(previousFetchAlerts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(previousFetchAlerts.fulfilled, (state, action) => {
      if (
        action.payload.Status !== undefined &&
        action.payload.Status === "Expired"
      ) {
        state.previousExpiredAlertsCount = action.payload.Count;
        state.previousTotalAlertsCount += parseInt(action.payload.Count);
      }
      if (
        action.payload.Status !== undefined &&
        action.payload.Status === "Unprocessed"
      ) {
        state.previousUnprocessedAlertsCount = action.payload.Count;
        state.previousTotalAlertsCount += parseInt(action.payload.Count);
      }
      if (
        action.payload.Status !== undefined &&
        action.payload.Status === "Processed"
      ) {
        state.previousProcessedAlertsCount = action.payload.Count;
        state.previousTotalAlertsCount += parseInt(action.payload.Count);
      }
      if (action.payload.Status === undefined) {
        state.loading = false;
        state.alertsPreviousMonth = [];
        state.alertsPreviousMonth = action.payload;
      }
    });
    builder.addCase(previousFetchAlerts.rejected, (state, action) => {
      state.loading = false;
      state.alertsPreviousMonth = [];
      state.errors = action.error.message;
    });
  },
});
export default previousAlertSlice.reducer;
