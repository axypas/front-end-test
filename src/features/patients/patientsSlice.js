import { createSlice } from "@reduxjs/toolkit";

import { authenticateUserSuccess } from "../common/actions";

const initialState = {
  patientsPerLevel: [],
};

const patientsSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {},
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [authenticateUserSuccess.type]: (state, action) => {
      const { patients } = action.payload;

      const mapResponseToPatient = (responsePatient) => ({
        name: responsePatient.name,
        joined: responsePatient.joined,
        lastVisitDate: responsePatient.last_visit_date,
        isCompleted: responsePatient.is_completed === true,
      });

      patients.sort((a, b) => a.type.localeCompare(b.type));
      state.patientsPerLevel = patients.reduce(
        (previousValue, currentValue) => {
          if (
            previousValue.length > 0 &&
            previousValue[previousValue.length - 1].level === currentValue.type
          ) {
            previousValue[previousValue.length - 1].patients.push(
              mapResponseToPatient(currentValue)
            );
            return previousValue;
          }
          return [
            ...previousValue,
            {
              level: currentValue.type,
              patients: [mapResponseToPatient(currentValue)],
            },
          ];
        },
        []
      );
    },
  },
});

export default patientsSlice.reducer;
