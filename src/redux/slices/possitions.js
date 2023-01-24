import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiEndpoint } from "../../config";

const initialState = {
  positions: [],
  loading: true,
  errors: null,
  positionsOpen: 0,
  todayPnl: 0,
  pnl: 0,
};
// const userId = "6372c6c0a8b2c2ec60b2da52";
export const fetchPositions = createAsyncThunk(
  "positions/fetchPositions",
  async (args = null) => {
    const startDate =
      args !== null && args.startDate !== undefined ? args.startDate : null;
    const endDate =
      args !== null && args.endDate !== undefined ? args.endDate : null;

    const response = await axios
      .get(
        `${apiEndpoint}ActiveTrades/${args.userId}/${startDate}/${endDate}`,
        {
          params: {
            status: args !== null && args.status !== "all" ? args.status : null,
            count: args !== null ? args.count : null,
          },
        }
      )
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        return error;
      });
    args = null;
    return response;
  }
);
export const fetchPNL = createAsyncThunk(
  "positions/fetchPNL",
  async (args = null) => {
    const firstDay = args.startDate;
    const lastDay = args.endDate;
    const response = await axios
      .get(`${apiEndpoint}/PnL/${args.userId}/${firstDay}/${lastDay}`, {
        params: {
          apiCall: args.apiCall,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        return error;
      });
    args = null;
    return response;
  }
);
export const positionsSlice = createSlice({
  name: "positionsList",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchPositions.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPositions.fulfilled, (state, action) => {
      if (
        action.payload.Status !== undefined &&
        action.payload.Status === "open"
      ) {
        state.positionsOpen = action.payload.Count;
      }
      if (action.payload.Status === undefined) {
        state.loading = false;
        state.positions = [];
        state.positions = action.payload;
      }
    });
    builder.addCase(fetchPositions.rejected, (state, action) => {
      state.loading = false;
      state.positions = [];
      state.errors = action.error.message;
    });
    builder.addCase(fetchPNL.fulfilled, (state, action) => {
      if (action.payload.PnL && action.meta.arg.apiCall === "totalPnl") {
        state.pnl = action.payload.PnL;
      }

      if (action.payload.PnL && action.meta.arg.apiCall === "today") {
        state.todayPnl = action.payload.Pnl;
      }
    });
  },
});
export default positionsSlice.reducer;
