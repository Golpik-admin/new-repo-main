import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "@redux-devtools/extension";
import alertApiReducer from "../redux/slices/alerts";
import alertPreviousApiReducer from "../redux/slices/alertsPreviousMonth";
import positionsApiReducer from "../redux/slices/possitions";

export const store = configureStore(
  {
    reducer: {
      alertsList: alertApiReducer,
      previousAlertsList: alertPreviousApiReducer,
      processedAlertCount: alertApiReducer,
      positionsList: positionsApiReducer,
    },
  },
  composeWithDevTools()
);
