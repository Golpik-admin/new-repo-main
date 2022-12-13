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
// const userId = "6372c6c0a8b2c2ec60b2da52";
export const updateFetchedSettings = createAsyncThunk(
  "settings/updateFetchedSettings",
  async (args = null) => {
    console.log(args);
    const response = await axios
      .post(
        `${apiEndpoint}SetUserSettingsByUserId/?User_Id=${
          args !== null ? args.User_Id.split("|")[1] : null
        }`,
        {
          params: {
            // User_Id: args !== null ? args.User_Id.split("|")[1] : null,
            // status: args !== null && args.status !== "all" ? args.status : null,
            // count: args !== null ? args.count : null,
            DefaultStrike: args !== null ? args.values.DefaultStrike : null,
            StrikeCalculation:
              args !== null ? parseInt(args.values.StrikeCalculation) : null,
            DefaultExpiry: args !== null ? args.values.DefaultExpiry : null,
            ExpiryCalculation:
              args !== null ? parseInt(args.values.ExpiryCalculation) : 4,
            RiskManagementActive:
              args !== null ? args.values.RiskManagementActive : null,
            TestMode: args !== null ? args.values.TestMode : null,
            id: "6398936326682264cad3f30f-638065223886532157",
            Scope: args !== null ? parseInt(args.values.Scope) : null,
          },
        }
      )
      .then((response) => {
        console.log(response);
        return response.data;
      })
      .catch(function (error) {
        return error;
      });
    return response;
  }
);

export const updateFetchedSettingSlice = createSlice({
  name: "updateFetchedSettingsList",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(updateFetchedSettings.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateFetchedSettings.fulfilled, (state, action) => {
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
    builder.addCase(updateFetchedSettings.rejected, (state, action) => {
      state.loading = false;
      state.settings = [];
      state.errors = action.error.message;
    });
  },
});
export default updateFetchedSettingSlice.reducer;
