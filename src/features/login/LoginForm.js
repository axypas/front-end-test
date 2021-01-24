import React, { useEffect, useState } from "react";
import { Form, Input, Button } from "antd";

const LoginForm = ({ onSubmit }) => {
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});

  // NOTE looks hacky but it is taken from the documentation of Antd.
  // To disable submit button at the beginning.
  useEffect(() => {
    forceUpdate({});
  }, []);

  return (
    <div className="loginFormContainer">
      <Form
        form={form}
        className="loginForm"
        layout={"vertical"}
        name="login"
        initialValues={{ remember: true }}
        onFinish={onSubmit}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              type: "email",
              message: "Your username should be an email",
            },
            {
              pattern: /@(\w){1,128}\./,
              message:
                "The email should have at max 128 characters between '@' and '.'",
            },
            {
              pattern: /\.\w{1,6}$/,
              message:
                "The email should have at max 6 characters after last '.' character",
            },
          ]}
        >
          <Input size="large" type="email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "The password is not valid" },
            {
              pattern: /^[a-z0-9]+$/i,
              message: "The email should be alphanumeric only",
            },
            {
              min: 8,
              message: "The email should have at least 8 characters",
            },
            {
              max: 128,
              message: "The email should have at max 128 characters",
            },
            {
              pattern: /\d{1}/,
              message: "The email should have at least one number",
            },
            {
              pattern: /[A-Z]{1}/,
              message: "The email should have at least one capital letter",
            },
          ]}
        >
          <Input.Password size="large" />
        </Form.Item>

        <Form.Item shouldUpdate={true}>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              disabled={
                !form.isFieldsTouched(true) ||
                !!form.getFieldsError().filter(({ errors }) => errors.length)
                  .length
              }
            >
              Log in
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
