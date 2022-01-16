import React from "react";
import { Helmet } from "react-helmet";
import LoginForm from "../../components/userAuth/LoginForm";

const Login = () => {
  return (
    <>
      <Helmet title="Splash Notes | Login" />
      <LoginForm />
    </>
  );
};

export default Login;
