import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  TDAmeritrade: false,
  lastTDAmeritrade: false,
  ETrade: "",
  data: {},
};

export const postTDAmeritrade = createAsyncThunk(
  "TDAmeritrade/postTDAmeritrade",
  async (payload) => {
    // var config = {
    //   method: "post",
    //   url: "https://api.tdameritrade.com/v1/oauth2/token",
    //   // headers: {
    //   //   "Content-Type": "application/x-www-form-urlencoded",
    //   // },
    //   data: payload,
    // };

    // const response = axios(config)
    const response = await axios
      .post("https://api.tdameritrade.com/v1/oauth2/token", payload, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        return response;
      })
      .catch(function (error) {
        return error;
      });
    return response;
  }
);

export const lastPostTDAmeritrade = createAsyncThunk(
  "TDAmeritrade/lastPostTDAmeritrade",
  async (payload) => {
    const response = await axios
      .post(
        "https://prod-05.centralus.logic.azure.com:443/workflows/a819cbcf64504dd0b4504ec4152798a9/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=uANsPNLcocktx7bGdIf14k1mLwV7PSLfclhq4p2d8KQ"
      )
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

    builder.addCase(lastPostTDAmeritrade.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(lastPostTDAmeritrade.fulfilled, (state, action) => {
      if (action.payload !== undefined) {
        state.loading = false;
        state.data = action.payload;
        state.lastTDAmeritrade = true;
      }
      if (action.payload === undefined) {
        state.loading = true;
        state.data = {};
      }
    });
    builder.addCase(lastPostTDAmeritrade.rejected, (state, action) => {
      state.loading = true;
      state.errors = action.error.message;
    });
  },
});

export default integrationSlice.reducer;
