import { createSlice } from "@reduxjs/toolkit";

export const messageSlice = createSlice({
  name: "messages",
  initialState: {
    type: "",
    message: "",
    code: "",
    price: false,
    product: null,
    recurringInterval: null,
    recurringIntervalCount: null,
  },
  reducers: {
    setMesssage: (state, actions) => {
      console.log(actions);
      state.type = actions.payload.type;
      state.message = actions.payload.message;
      state.code = actions.payload.code;
      if (!actions.payload.price || actions.payload.price) {
        state.price = actions.payload.price;
      }
      if (actions.payload.product) {
        state.product = actions.payload.product;
      }
      if (actions.payload.recurringInterval) {
        state.recurringInterval = actions.payload.recurringInterval;
      }
      if (actions.payload.recurringIntervalCount) {
        state.recurringIntervalCount = actions.payload.recurringIntervalCount;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMesssage } = messageSlice.actions;

export default messageSlice.reducer;
