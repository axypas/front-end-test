import { createAction } from "@reduxjs/toolkit";

// action used in loginSlice and patientSlice 
export const authenticateUserSuccess = createAction(
  "AUTHENTICATE_USER_SUCCESS"
);
