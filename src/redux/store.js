import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "@redux-devtools/extension";
import alertApiReducer from "../redux/slices/alerts";
import alertPreviousApiReducer from "../redux/slices/alertsPreviousMonth";
import positionsApiReducer from "../redux/slices/possitions";
import positionsPreviousApiReducer from "../redux/slices/positionsPreviousMonth";
import getSettingsReducer from "../redux/slices/getSettings";
import updateSettingsReducer from "../redux/slices/updateSettings";

export const store = configureStore(
  {
    reducer: {
      alertsList: alertApiReducer,
      previousAlertsList: alertPreviousApiReducer,
      processedAlertCount: alertApiReducer,
      positionsList: positionsApiReducer,
      positionsListPrevious: positionsPreviousApiReducer,
      fetchSettingsList: getSettingsReducer,
      updateSettingsList: updateSettingsReducer,
    },
  },
  composeWithDevTools()
);
