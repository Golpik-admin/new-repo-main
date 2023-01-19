import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "@redux-devtools/extension";
import alertApiReducer from "../redux/slices/alerts";
import alertPreviousApiReducer from "../redux/slices/alertsPreviousMonth";
import positionsApiReducer from "../redux/slices/possitions";
import positionsPreviousApiReducer from "../redux/slices/positionsPreviousMonth";
import getSettingsReducer from "../redux/slices/getSettings";
import updateSettingsReducer from "../redux/slices/updateSettings";
import getRiskManagement from "../redux/slices/getRiskManagement";
import updateRiskManagement from "../redux/slices/updateRiskManagement";
import messageSlice from "./slices/messageSlice";
import integrationSlice from "./slices/integration";

export const store = configureStore(
  {
    reducer: {
      alertsList: alertApiReducer,
      previousAlertsList: alertPreviousApiReducer,
      processedAlertCount: alertApiReducer,
      positionsList: positionsApiReducer,
      positionsListPrevious: positionsPreviousApiReducer,
      fetchSettingsList: getSettingsReducer,
      updateFetchedSettingsList: updateSettingsReducer,
      riskManagementsList: getRiskManagement,
      riskManagementsUpdateList: updateRiskManagement,
      messageState: messageSlice,
      integrations: integrationSlice,
    },
  },
  composeWithDevTools()
);
