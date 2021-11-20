import React, { useState } from "react";
// import { Container } from "react-bootstrap";
import Card from "./MainCard";
import MainNavbar from "./MainNavbar";

const Main = () => {
  const [search, setSearch] = useState("");
  return (
    <>
      <MainNavbar setSearch={setSearch} />
      <Card search={search} />
    </>
  );
};

export default Main;
