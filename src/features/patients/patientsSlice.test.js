import reducer from "./patientsSlice";

import { authenticateUserSuccess } from "../common/actions";

describe("PatientsSlice", () => {
  describe("reducers", () => {
    const initialState = { patientsPerLevel: []};

    it("maps the backend response for the frontend", () => {
      const patients = [
        {
          _id: "5f2bb7185756010021aecf228uyhgyuy7ujhy7u",
          name: "Adam S",
          type: "a_level",
          hospital_id: "56f165b7f21cbefc43efee7bi8yui8uyui8uy",
          joined: "2020-08-06T07:54:00.232Z",
          last_visit_date: "2020-08-06T00:00:00.000Z",
          is_completed: false,
        },
        {
          _id: "5f2bb7185756010021aecf228uyhgyuy7ujhy7u",
          name: "Adam F",
          type: "a_level",
          hospital_id: "56f165b7f21cbefc43efee7bi8yui8uyui8uy",
          joined: "2020-08-06T07:54:00.232Z",
          last_visit_date: "2020-08-07T00:00:00.000Z",
          is_completed: false,
        },
        {
          _id: "5f2bb7185756010021aecf228uyhgyuy7ujhy7u",
          name: "John D",
          type: "c_level",
          hospital_id: "56f165b7f21cbefc43efee7bi8yui8uyui8uy",
          joined: "2020-08-06T07:54:00.232Z",
          last_visit_date: "2020-08-08T00:00:00.000Z",
          is_completed: false,
        },
        {
          _id: "5f2bb7185756010021aecf228uyhgyuy7ujhy7u",
          name: "Bruce W",
          type: "c_level",
          hospital_id: "56f165b7f21cbefc43efee7bi8yui8uyui8uy",
          joined: "2020-08-06T07:54:00.232Z",
          last_visit_date: "2020-08-09T00:00:00.000Z",
          is_completed: false,
        },
        {
          _id: "5f2bb7185756010021aecf228uyhgyuy7ujhy7u",
          name: "Jasper P",
          type: "d_level",
          hospital_id: "56f165b7f21cbefc43efee7bi8yui8uyui8uy",
          joined: "2020-08-06T07:54:00.232Z",
          last_visit_date: "2020-09-06T00:00:00.000Z",
          is_completed: false,
        },
        {
          _id: "5f2bb7185756010021aecf228uyhgyuy7ujhy7u",
          name: "Luke S",
          type: "a_level",
          hospital_id: "56f165b7f21cbefc43efee7bi8yui8uyui8uy",
          joined: "2020-08-06T07:54:00.232Z",
          last_visit_date: "2020-10-06T00:00:00.000Z",
          is_completed: {
            level1: {
              anotherLevel: true,
              is_completed: "yes",
            },
          },
        },
        {
          _id: "5f2bb7185756010021aecf228uyhgyuy7ujhy7u",
          name: "Florian G",
          type: "a_level",
          hospital_id: "56f165b7f21cbefc43efee7bi8yui8uyui8uy",
          joined: "2020-08-06T07:54:00.232Z",
          last_visit_date: "2020-11-06T00:00:00.000Z",
          is_completed: false,
        },
      ];
      const action = {
        type: authenticateUserSuccess.type,
        payload: { patients },
      };
      const state = reducer(initialState, action);

      const expectedPatients = [
        {
          level: "a_level",
          patients: [
            {
              name: "Adam S",
              joined: "2020-08-06T07:54:00.232Z",
              lastVisitDate: "2020-08-06T00:00:00.000Z",
              isCompleted: false,
            },
            {
              name: "Adam F",
              joined: "2020-08-06T07:54:00.232Z",
              lastVisitDate: "2020-08-07T00:00:00.000Z",
              isCompleted: false,
            },
            {
              name: "Luke S",
              joined: "2020-08-06T07:54:00.232Z",
              lastVisitDate: "2020-10-06T00:00:00.000Z",
              isCompleted: false, // TODO not sure if it should be false. Better to ask PM.
            },
            {
              name: "Florian G",
              joined: "2020-08-06T07:54:00.232Z",
              lastVisitDate: "2020-11-06T00:00:00.000Z",
              isCompleted: false,
            },
          ],
        },
        {
          level: "c_level",
          patients: [
            {
              name: "John D",
              joined: "2020-08-06T07:54:00.232Z",
              lastVisitDate: "2020-08-08T00:00:00.000Z",
              isCompleted: false,
            },
            {
              name: "Bruce W",
              joined: "2020-08-06T07:54:00.232Z",
              lastVisitDate: "2020-08-09T00:00:00.000Z",
              isCompleted: false,
            },
          ],
        },
        {
          level: "d_level",
          patients: [
            {
              name: "Jasper P",
              joined: "2020-08-06T07:54:00.232Z",
              lastVisitDate: "2020-09-06T00:00:00.000Z",
              isCompleted: false,
            },
          ],
        },
      ];
      expect(state).toEqual({ patientsPerLevel: expectedPatients });
    });
  });
});
