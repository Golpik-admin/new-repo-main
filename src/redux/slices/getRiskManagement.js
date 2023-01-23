import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiEndpoint } from "../../config";
// axios.defaults.headers.common["Authorization"] =
//   "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIiwiaXNzIjoiaHR0cHM6Ly9kZXYtYzM3c3M0dDcxdHJzY2Vjei51cy5hdXRoMC5jb20vIn0..BpIko-SWHZajAYQb.SXnqG7qVi6o59_RcU8_c8qEB1P-7bLSk-7OA7LI6OyJXzgVXJ8pyTQIsvD4XFBPXhk4Y6_PXG9eTeXbYeYImevlz6NlxvW4oYKna11Htvwyciq_kmFIVg9WLmviiPNkrMThZR9-TdtUhevp9tFMe7MOY60a6xhn8Q7L1V7vpE6D0dlUx51NrgesDqN0FWy18qXMVX2OCtZ922mj2ll2q8idNPEyUHoBA0kEI-nR_GCBxMVjBwluGZX5l9neLfSYdpsk4FeCpJNhtmTYArc2w_IJ4XmB0TkfDqVPSwfuLW9X_9MC4dhoHCIzEkFxcFZ0Ag9p7bH7T_ngJKGIMHRNtbmW6.FQDuw0Ia_gzhWZwsxOLkZQ";

const initialState = {
  riskManagements: [],
  loading: true,
  errors: null,
  tickersRiskManagement: [],
  processedRiskManagementsCount: 0,
  unprocessedRiskManagementsCount: 0,
  expiredRiskManagementsCount: 0,
  totalRiskManagementsCount: 0,
};
// const userId = "6372c6c0a8b2c2ec60b2da52";
export const fetchRiskManagements = createAsyncThunk(
  "riskManagements/fetchRiskManagements",
  async (args = null) => {
    const response = await axios
      .get(`${apiEndpoint}GetRiskManagementByUserId`, {
        params: {
          //   status: args !== null && args.status !== "all" ? args.status : null,
          //   count: args !== null ? args.count : null,
          User_Id: args !== null ? args.userId : null,
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

export const riskManagementsSlice = createSlice({
  name: "riskManagementsList",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchRiskManagements.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchRiskManagements.fulfilled, (state, action) => {
      if (action.payload.Status === undefined) {
        state.loading = false;
        state.tickersRiskManagement = action.payload.Tickers;
      }
      if (action.payload.Status !== undefined) {
        state.loading = false;
        state.riskManagements = [];
        state.riskManagements = action.payload;
      }
    });
    builder.addCase(fetchRiskManagements.rejected, (state, action) => {
      state.loading = false;
      state.riskManagements = [];
      state.errors = action.error.message;
    });
  },
});
export default riskManagementsSlice.reducer;
