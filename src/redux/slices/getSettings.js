import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiEndpoint } from "../../config";

const initialState = {
  setting: {
    settings: [],
    loading: true,
    errors: null,
    DefaultStrike: false,
    StrikeCalculation: "",
    DefaultExpiry: false,
    ExpiryCalculation: "",
    RiskManagementActive: false,
    TestMode: false,
    Scope: false,
  },
};
export const fetchSettings = createAsyncThunk(
  "settings/fetchSettings",
  async (args = null) => {
    const response = await axios
      .get(`${apiEndpoint}GetUserSettingsByUserId`, {
        params: {
          User_Id: args !== null ? args.User_Id.split("|")[1] : null,
          // DefaultStrike: args !== null ? args.DefaultStrike : null,
          // StrikeCalculation: args !== null ? args.StrikeCalculation : null,
          // DefaultExpiry: args !== null ? args.DefaultExpiry : null,
          // ExpiryCalculation: args !== null ? args.ExpiryCalculation : null,
          // RiskManagementActive: args !== null ? args.RiskManagementActive : null,
          // TestMode: args !== null ? args.TestMode : null,
          // id:userId,
          // Scope:1,
        },
      })
      .then((response) => {
        // console.log(response.data);
        return response.data;
      })
      .catch(function (error) {
        return error;
      });
    return response;
  }
);

export const fetchSettingslice = createSlice({
  name: "fetchSettingsList",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchSettings.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSettings.fulfilled, (state, action) => {
      console.log(state, action);
      // if (
      //   action.payload.Status !== undefined &&
      //   action.payload.Status === "Expired"
      // ) {
      //   state.expiredAlertsCount = action.payload.Count;
      //   state.totalAlertsCount += parseInt(action.payload.Count);
      // }
      console.log(action);
      if (action.payload) {
        state.setting.DefaultStrike = action.payload.DefaultStrike;
        state.setting.StrikeCalculation = action.payload.StrikeCalculation;
        state.setting.DefaultExpiry = action.payload.DefaultExpiry;
        state.setting.ExpiryCalculation = action.payload.ExpiryCalculation;
        state.setting.RiskManagementActive =
          action.payload.RiskManagementActive;
        state.setting.TestMode = action.payload.TestMode;
        state.setting.Scope = action.payload.Scope;

        if (action.payload.Status === undefined) {
          state.setting.loading = false;
          state.setting.settings = [];
          state.setting.settings = action.payload;
        }
      }
    });
    // builder.addCase(fetchSettings.rejected, (state, action) => {
    //   state.loading = false;
    //   state.settings = [];
    //   state.errors = action.error.message;
    // });
  },
});
export default fetchSettingslice.reducer;
