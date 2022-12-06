import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiEndpoint } from "../../config";

const initialState = {
  positions: [],
  loading: true,
  errors: null,
};
const userId = "6372c6c0a8b2c2ec60b2da52";
const startDate = null;
const endDate = null;
export const fetchPositions = createAsyncThunk(
  "positions/fetchPositions",
  async (args = null) => {
    const response = await axios
      .get(
        `${apiEndpoint}/ActiveTrades/${userId}/${startDate}/${endDate}/TextForAccessToken`,
        {
          params: {
            status: args !== null ? args.status : null,
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
    return response;
  }
);

export const positionsSlice = createSlice({
  name: "positionsList",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchPositions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPositions.fulfilled, (state, action) => {
        state.loading = false;
        state.positions = [];
        state.positions = action.payload;
      })
      .addCase(fetchPositions.rejected, (state, action) => {
        state.loading = false;
        state.positions = [];
        state.errors = action.error.message;
      });
  },
});
export default positionsSlice.reducer;
