import React from "react";
import { Helmet } from "react-helmet";
import MainNavbar from "../components/layout/MainNavbar";
import UserDetailsForm from "../components/profile/UserDetailsForm";

const Profile = () => {
  return (
    <>
      <Helmet title="Splash Notes | Profile" />
      <MainNavbar />
      <UserDetailsForm />
    </>
  );
};

export default Profile;
