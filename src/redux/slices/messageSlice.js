import { createSlice } from "@reduxjs/toolkit";

export const messageSlice = createSlice({
  name: "messages",
  initialState: {
    alert: {
      type: "success",
      message: "",
      code: 200,
    },
  },
  reducers: {
    setMesssage: (state, actions) => {
      state.value += actions.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = messageSlice.actions;

export default messageSlice.reducer;
