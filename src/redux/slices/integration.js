import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  TDAmeritrade: false,
  ETrade: "",
  data: {},
};

export const postTDAmeritrade = createAsyncThunk(
  "TDAmeritrade/postTDAmeritrade",
  async (payload) => {
    const response = await axios
      .post("https://api.tdameritrade.com/v1/oauth2/token", payload)
      .then((response) => {
        return response;
      })
      .catch(function (error) {
        return error;
      });
    return response;
  }
);

export const integrationSlice = createSlice({
  name: "integrations",
  initialState,
  reducers: {
    ameritradeCode: (state, action) => {
      state.TDAmeritrade = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postTDAmeritrade.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(postTDAmeritrade.fulfilled, (state, action) => {
      if (action.payload !== undefined) {
        state.loading = false;
        state.data = action.payload;
        state.TDAmeritrade = true;
      }
      if (action.payload === undefined) {
        state.loading = true;
        state.data = {};
      }
    });
    builder.addCase(postTDAmeritrade.rejected, (state, action) => {
      state.loading = true;
      state.errors = action.error.message;
    });
  },
});

export default integrationSlice.reducer;
