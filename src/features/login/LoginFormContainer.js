import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";


import { authenticateUser } from "./loginSlice";
import LoginForm from "./LoginForm";

const LoginFormContainer = ({ onSubmit }) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();

  const handleSubmit = ({ username, password }) => {
    setUsername(username);
    setPassword(password);
  };

  useEffect(() => {
    if (username && password) {
      dispatch(authenticateUser({ username, password }));
    }
  }, [username, password, dispatch]);

  return <LoginForm onSubmit={handleSubmit} />;
};

export default LoginFormContainer;
