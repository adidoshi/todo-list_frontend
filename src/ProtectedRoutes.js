import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoutes = ({ component: Component, ...rest }) => {
  const user = useSelector((state) => state.user);
  return (
    <Route
      {...rest}
      render={() =>
        user.userInfo ? <Component {...rest} /> : <Redirect to="/login" />
      }
    />
  );
};

export default ProtectedRoutes;
