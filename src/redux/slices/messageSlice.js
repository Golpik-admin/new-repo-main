import { createSlice } from "@reduxjs/toolkit";

export const messageSlice = createSlice({
  name: "messages",
  initialState: {
    type: "",
    message: "",
    code: "",
    price: false,
  },
  reducers: {
    setMesssage: (state, actions) => {
      console.log(actions);
      state.type = actions.payload.type;
      state.message = actions.payload.message;
      state.code = actions.payload.code;
      state.price = actions.payload.price;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMesssage } = messageSlice.actions;

export default messageSlice.reducer;
