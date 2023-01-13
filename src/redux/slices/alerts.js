import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiEndpoint } from "../../config";
// axios.defaults.headers.common["Authorization"] =
//   "Bearer eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIiwiaXNzIjoiaHR0cHM6Ly9kZXYtYzM3c3M0dDcxdHJzY2Vjei51cy5hdXRoMC5jb20vIn0..BpIko-SWHZajAYQb.SXnqG7qVi6o59_RcU8_c8qEB1P-7bLSk-7OA7LI6OyJXzgVXJ8pyTQIsvD4XFBPXhk4Y6_PXG9eTeXbYeYImevlz6NlxvW4oYKna11Htvwyciq_kmFIVg9WLmviiPNkrMThZR9-TdtUhevp9tFMe7MOY60a6xhn8Q7L1V7vpE6D0dlUx51NrgesDqN0FWy18qXMVX2OCtZ922mj2ll2q8idNPEyUHoBA0kEI-nR_GCBxMVjBwluGZX5l9neLfSYdpsk4FeCpJNhtmTYArc2w_IJ4XmB0TkfDqVPSwfuLW9X_9MC4dhoHCIzEkFxcFZ0Ag9p7bH7T_ngJKGIMHRNtbmW6.FQDuw0Ia_gzhWZwsxOLkZQ";

const initialState = {
  alerts: [],
  loading: true,
  errors: null,
  processedAlertsCount: 0,
  unprocessedAlertsCount: 0,
  expiredAlertsCount: 0,
  totalAlertsCount: 0,
};
export const fetchAlerts = createAsyncThunk(
  "alerts/fetchAlerts",
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
        state.totalAlertsCount += parseInt(action.payload.Count);
      }
      if (
        action.payload.Status !== undefined &&
        action.payload.Status === "Unprocessed"
      ) {
        state.unprocessedAlertsCount = action.payload.Count;
        state.totalAlertsCount += parseInt(action.payload.Count);
      }
      if (
        action.payload.Status !== undefined &&
        action.payload.Status === "Processed"
      ) {
        state.processedAlertsCount = action.payload.Count;
        state.totalAlertsCount += parseInt(action.payload.Count);
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
