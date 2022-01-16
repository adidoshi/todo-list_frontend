import React from "react";
import { Helmet } from "react-helmet";
import RegisterForm from "../../components/userAuth/RegisterForm";

const Register = () => {
  return (
    <>
      <Helmet title="Splash Notes | Register" />
      <RegisterForm />
    </>
  );
};

export default Register;
