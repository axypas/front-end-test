import { createSlice } from "@reduxjs/toolkit";

import { login as loginUser } from "../../api/loginAPI";
import { authenticateUserSuccess } from "../common/actions";

const initialState = {
  isAuthenticated: false,
  error: undefined,
  username: undefined,
};

const authentication = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    authenticateUserFailed(state, action) {
      if (!state.isAuthenticated) {
        state.isAuthenticated = false;
      }
      state.error = action.payload;
    },
  },
  extraReducers: {
    [authenticateUserSuccess.type]: (state, action) => {
      state.isAuthenticated = true;
      state.username = action.payload.username
    },
  },
});

export const { authenticateUserFailed } = authentication.actions;

export default authentication.reducer;

export const authenticateUser = ({ username, password }) => async (
  dispatch
) => {
  try {
    const request = await loginUser(username, password);
    dispatch(authenticateUserSuccess(request.data));
  } catch (err) {
    dispatch(authenticateUserFailed(err.toString()));
  }
};
