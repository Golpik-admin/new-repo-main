import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiEndpoint } from "../../config";

const initialState = {
  settings: [],
  loading: true,
  errors: null,
  User_Meta_Id: null,
  DefaultStrike: null,
  StrikeCalculation: null,
  DefaultExpiry: null,
  ExpiryCalculation: null,
  RiskManagementActive: null,
  TestMode: null,
  Scope: null,
  message: false,
};
// const userId = "6372c6c0a8b2c2ec60b2da52";
export const updateFetchedSettings = createAsyncThunk(
  "settings/updateFetchedSettings",
  async (args = null) => {
    const response = await axios
      .post(
        `${apiEndpoint}SetUserSettingsByUserId?User_Id=${
          args !== null ? args.User_Id.split("|")[1] : null
        }`,
        {
          // params: {
          User_Id: args !== null ? args.User_Id.split("|")[1] : null,
          // status: args !== null && args.status !== "all" ? args.status : null,
          // count: args !== null ? args.count : null,
          DefaultStrike: args !== null ? args.values.DefaultStrike : null,
          StrikeCalculation:
            args !== null ? parseInt(args.values.StrikeCalculation) : null,
          DefaultExpiry: args !== null ? args.values.DefaultExpiry : null,
          ExpiryCalculation:
            args !== null ? parseInt(args.values.ExpiryCalculation) : null,
          RiskManagementActive:
            args !== null ? args.values.RiskManagementActive : null,
          TestMode: args !== null ? args.values.TestMode : null,
          id: args !== null ? args.values.User_Meta_Id : null,
          Scope: args !== null ? parseInt(args.values.Scope) : null,
          // },
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
      state.loading = false;
      state.User_Meta_Id = action.payload.id;
      state.DefaultStrike = action.payload.DefaultStrike;
      state.StrikeCalculation = action.payload.StrikeCalculation;
      state.DefaultExpiry = action.payload.DefaultExpiry;
      state.ExpiryCalculation = action.payload.ExpiryCalculation;
      state.RiskManagementActive = action.payload.RiskManagementActive;
      state.TestMode = action.payload.TestMode;
      state.Scope = action.payload.Scope;
      state.message = action.payload.Status;
      if (action.payload === undefined) {
        state.message = action.payload.Status;
        state.loading = true;
        state.settings = [];
        state.settings = action.payload;
      }
    });
    builder.addCase(updateFetchedSettings.rejected, (state, action) => {
      state.message = action.message;
      state.loading = true;
      state.settings = [];
      state.errors = action.error.message;
    });
  },
});
export default updateFetchedSettingSlice.reducer;
