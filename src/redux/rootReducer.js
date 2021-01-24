import { combineReducers } from "@reduxjs/toolkit";

import loginReducer from "../features/login/loginSlice";
import patientsReducer from "../features/patients/patientsSlice";

export default combineReducers({
  loginReducer,
  patientsReducer,
});
