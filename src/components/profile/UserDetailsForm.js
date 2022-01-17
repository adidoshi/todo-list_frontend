import React, { useEffect, useState } from "react";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import profileImg from "../../assets/images/profileImg.png";
import { updateUserAsync } from "../../redux/api/userApi";

const UserDetailsForm = () => {
  const { userInfo, profilePending } = useSelector((state) => state.user);

  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState("");
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUserAsync({ name, email, pic }));
  };

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      setName(userInfo?.name);
      setEmail(userInfo?.email);
      setPic(userInfo?.pic);
    }
  }, [history, userInfo, dispatch]);
  return (
    <>
      <Toaster />
      <Container
        fluid="md"
        className="my-3 "
        style={{
          border: "3px solid black",
          borderRadius: "14px",
        }}>
        <h2 className="text-center my-2">Profile</h2>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {!userInfo.pic ? (
            <img
              src={profileImg}
              width="180px"
              height="180px"
              alt="check url"
            />
          ) : (
            <img
              src={userInfo?.pic}
              width="180px"
              height="180px"
              style={{ borderRadius: "50%" }}
              alt="check url"
            />
          )}
        </div>

        {profilePending && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}>
            <Spinner animation="border" />
          </div>
        )}

        <Form className="mt-5">
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Update Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="content">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              rows={3}
              placeholder="Update Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="category">
            <Form.Label>Avatar URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="avatar url"
              value={pic}
              onChange={(e) => setPic(e.target.value)}
            />
          </Form.Group>
          <Button
            type="submit"
            variant="warning"
            className=" mb-4"
            onClick={submitHandler}>
            Update
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default UserDetailsForm;
