import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  positions: [],
  loading: true,
  errors: null,
};
export const url = process.env.REACT_APP_POSSITIONS_API;
export const fetchPositions = createAsyncThunk(
  "positions/fetchPositions",
  async () => {
    const response = await axios
      .get(`${url}`)
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
