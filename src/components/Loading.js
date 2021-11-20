import React from "react";
import { Spinner } from "react-bootstrap";

const Loading = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}>
        <Spinner animation="border" variant="info" />
      </div>
    </>
  );
};

export default Loading;
