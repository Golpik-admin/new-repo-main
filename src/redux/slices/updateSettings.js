import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiEndpoint } from "../../config";

const initialState = {
  settings: [],
  loading: true,
  errors: null,
  DefaultStrike: null,
  StrikeCalculation: null,
  DefaultExpiry: null,
  ExpiryCalculation: null,
  RiskManagementActive: null,
  TestMode: null,
  Scope: null,
};
const userId = "6372c6c0a8b2c2ec60b2da52";
export const updateSettings = createAsyncThunk(
  "settings/updateSettings",
  async (args = null) => {
    const response = await axios
      .post(`${apiEndpoint}SetUserSettingsByUserId/?User_Id=${userId}`, {
        params: {
          // status: args !== null && args.status !== "all" ? args.status : null,
          // count: args !== null ? args.count : null,
          DefaultStrike: args !== null ? args.DefaultStrike : null,
          StrikeCalculation: args !== null ? args.StrikeCalculation : null,
          DefaultExpiry: args !== null ? args.DefaultExpiry : null,
          ExpiryCalculation: args !== null ? args.ExpiryCalculation : null,
          RiskManagementActive:
            args !== null ? args.RiskManagementActive : null,
          TestMode: args !== null ? args.TestMode : null,
          id: userId,
          Scope: args !== null ? args.Scope : null,
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

export const updateSettingSlice = createSlice({
  name: "updateSettingsList",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(updateSettings.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateSettings.fulfilled, (state, action) => {
      //   if (
      //     action.payload.Status !== undefined &&
      //     action.payload.Status === "Expired"
      //   ) {
      //     state.expiredAlertsCount = action.payload.Count;
      //     state.totalAlertsCount += parseInt(action.payload.Count);
      //   }
      state.DefaultStrike = action.payload.DefaultStrike;
      state.StrikeCalculation = action.payload.StrikeCalculation;
      state.DefaultExpiry = action.payload.DefaultExpiry;
      state.ExpiryCalculation = action.payload.ExpiryCalculation;
      state.RiskManagementActive = action.payload.RiskManagementActive;
      state.TestMode = action.payload.TestMode;
      state.Scope = action.payload.Scope;
      if (action.payload.Status === undefined) {
        state.loading = false;
        state.settings = [];
        state.settings = action.payload;
      }
    });
    builder.addCase(updateSettings.rejected, (state, action) => {
      state.loading = false;
      state.settings = [];
      state.errors = action.error.message;
    });
  },
});
export default updateSettingSlice.reducer;
