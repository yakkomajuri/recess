import React from "react";
import { Tabs } from "antd";
import { LoginForm } from "../components/login/LoginForm";
import { SignupForm } from "../components/login/SignupForm";

const LoginPage = () => {
  return (
    <div
      className="login-page"
      style={{ maxWidth: "300px", margin: "0 auto", marginTop: "50px" }}
    >
      <Tabs
        defaultActiveKey="login"
        items={[
          {
            key: "login",
            label: "Login",
            children: <LoginForm />,
          },
          {
            key: "signup",
            label: "Sign up",
            children: <SignupForm />,
          },
        ]}
      />
    </div>
  );
};

export { LoginPage };
