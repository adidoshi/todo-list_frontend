import React from "react";
import { Helmet } from "react-helmet";
import EditForm from "../components/edit/EditForm";
import MainNavbar from "../components/layout/MainNavbar";

const Edit = () => {
  return (
    <>
      <Helmet title="Splash Notes | Edit" />
      <MainNavbar />
      <EditForm />
    </>
  );
};

export default Edit;
