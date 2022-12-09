import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "@redux-devtools/extension";
import alertApiReducer from "../redux/slices/alerts";
import positionsApiReducer from "../redux/slices/possitions";

export const store = configureStore(
  {
    reducer: {
      alertsList: alertApiReducer,
      processedAlertCount: alertApiReducer,
      positionsList: positionsApiReducer,
    },
  },
  composeWithDevTools()
);
