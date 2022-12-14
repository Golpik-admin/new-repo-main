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
};

export const fetchSettings = createAsyncThunk(
  "settings/fetchSettings",
  async (args = null) => {
    const response = await axios
      .get(`${apiEndpoint}GetUserSettingsByUserId`, {
        params: {
          User_Id: args !== null ? args.User_Id.split("|")[1] : null,
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

export const fetchSettingslice = createSlice({
  name: "fetchSettingsList",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchSettings.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSettings.fulfilled, (state, action) => {
      if (action.payload !== undefined) {
        state.loading = false;
        state.User_Meta_Id = action.payload.id;
        state.DefaultStrike = action.payload.DefaultStrike;
        state.StrikeCalculation = action.payload.StrikeCalculation;
        state.DefaultExpiry = action.payload.DefaultExpiry;
        state.ExpiryCalculation = action.payload.ExpiryCalculation;
        state.RiskManagementActive = action.payload.RiskManagementActive;
        state.TestMode = action.payload.TestMode;
        state.Scope = action.payload.Scope;
      }
      if (action.payload === undefined) {
        state.loading = true;
        state.settings = [];
        state.settings = action.payload;
      }
    });
    builder.addCase(fetchSettings.rejected, (state, action) => {
      state.loading = true;
      state.settings = [];
      state.errors = action.error.message;
    });
  },
});
export default fetchSettingslice.reducer;
