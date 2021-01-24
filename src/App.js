import React from "react";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import LoginFormContainer from "./features/login/LoginFormContainer";
import Patients from "./features/patients/PatientList";

const App = () => {
  const isAuthenticated = useSelector((state) => {
    return state.loginReducer.isAuthenticated;
  });
  return (
    <>
      <header>
        <img src="./images/dhg_whole.png" />
      </header>
      <main>
        <Router>
          <Route
            path="/"
            exact
            component={isAuthenticated ? Patients : LoginFormContainer}
          />
          {/* <Route path="/patients" exact component={Patients} /> */}
        </Router>
      </main>
      <footer></footer>
    </>
  );
};

export default App;
