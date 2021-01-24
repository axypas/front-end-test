import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import LoginForm from "./LoginForm";

test("submits the form", async () => {
  const handleSubmit = jest.fn();
  render(<LoginForm onSubmit={handleSubmit} />);

  const submitButton = screen.getByRole("button", { name: /log in/i });
  expect(submitButton).toBeDisabled();

  const usernameInput = screen.getByLabelText(/username/i);
  const validEmail = "john.dow@gmail.com";
  fireEvent.change(usernameInput, { target: { value: validEmail } });
  expect(usernameInput.value).toBe(validEmail);

  const passwordInput = screen.getByLabelText(/password/i);
  const validPassword = "Password123";
  fireEvent.change(passwordInput, { target: { value: validPassword } });
  expect(passwordInput.value).toBe(validPassword);

  const submitButton1 = screen.getByRole("button", { name: /log in/i });
  fireEvent.click(submitButton1);

  // WaitFor is needed, see issue: https://github.com/ant-design/ant-design/issues/21272
  await waitFor(() =>
    expect(handleSubmit).toHaveBeenCalledWith({
      username: validEmail,
      password: validPassword,
    })
  );

  expect(submitButton1).toBeEnabled();
});

test("cannot submit the form when it has errors in the email", async () => {
  const handleSubmit = jest.fn();
  render(<LoginForm onSubmit={handleSubmit} />);

  const submitButton = screen.getByRole("button", { name: /log in/i });
  expect(submitButton).toBeDisabled();

  const usernameInput = screen.getByLabelText(/username/i);
  fireEvent.change(usernameInput, { target: { value: "a" } });

  const passwordInput = screen.getByLabelText(/password/i);
  const validPassword = "Password123";
  fireEvent.change(passwordInput, { target: { value: validPassword } });
  fireEvent.submit(submitButton);

  // WaitFor is needed, see issue: https://github.com/ant-design/ant-design/issues/21272
  await waitFor(() => expect(handleSubmit).toHaveBeenCalledTimes(0));
  expect(submitButton).toBeDisabled();
});

test("cannot submit the form when it has errors in the password", async () => {
  const handleSubmit = jest.fn();
  render(<LoginForm onSubmit={handleSubmit} />);

  const submitButton = screen.getByRole("button", { name: /log in/i });
  expect(submitButton).toBeDisabled();

  const usernameInput = screen.getByLabelText(/username/i);
  const validEmail = "john.dow@gmail.com";
  fireEvent.change(usernameInput, { target: { value: validEmail } });

  const passwordInput = screen.getByLabelText(/password/i);
  const password = "12345678";
  fireEvent.change(passwordInput, { target: { value: password } });
  fireEvent.submit(submitButton);

  // WaitFor is needed, see issue: https://github.com/ant-design/ant-design/issues/21272
  await waitFor(() => expect(handleSubmit).toHaveBeenCalledTimes(0));
  expect(submitButton).toBeDisabled();
});
