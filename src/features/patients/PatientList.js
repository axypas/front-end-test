import React from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import sortBy from "lodash.sortby";

const formatFromStringDate = (dateAsString) =>
  format(Date.parse(dateAsString), "d MMMM yyyy");

const PatientList = () => {
  const patientsPerLevel = useSelector((state) => {
    return state.patientsReducer.patientsPerLevel.map((patientPerLevel) => {
      // sort users ascending within groups by "last_visit_date" or alphabetically if dates are the same.
      const sortedPatients = sortBy(
        patientPerLevel.patients.map((patient) => ({
          ...patient,
          lastVisitDateUnix: Date.parse(patient.lastVisitDate),
        })),
        ["lastVisitDateUnix", "name"]
      );

      return {
        ...patientPerLevel,
        level: patientPerLevel.level.replace("_", '-'),
        patients: sortedPatients.map((patient) => ({
          ...patient,
          joined: formatFromStringDate(patient.joined),
          lastVisitDate: formatFromStringDate(patient.lastVisitDate),
        })),
      };
    });
  });

  return (
    <div className="patientsContainer">
      <h1>Patients:</h1>
      {patientsPerLevel.map((patientPerLevel) => (
        <div key={patientPerLevel.level}>
          <h2>{patientPerLevel.level}</h2>
          <div className="patientList">
            {patientPerLevel.patients
              .filter((patient) => !patient.isCompleted)
              .map((patient, index) => (
                <div key={index} className="patient">
                  {/* TODO consider to the an id for the patient, the one returned from the backend is not unique */}
                  <div>
                    <span>Name:</span>
                    {patient.name}
                  </div>
                  <div>
                    <span>Joined:</span>
                    {patient.joined}
                  </div>
                  <div>
                    <span>Last visit:</span>
                    {patient.lastVisitDate}
                  </div>
                  <div>
                    <span>Completed:</span>
                    {patient.isCompleted ? "true" : "false"}
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
      {patientsPerLevel.length === 0 && <div>No patients found</div>}
    </div>
  );
};

export default PatientList;
