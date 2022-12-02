import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "@redux-devtools/extension";
import alertApiReducer from "../redux/slices/alerts";

export const store = configureStore(
  {
    reducer: {
      alertsList: alertApiReducer,
    },
  },
  composeWithDevTools()
);
