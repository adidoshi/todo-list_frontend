import React, { useState } from "react";
import {
  Button,
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import CreateNoteModal from "../home/CreateNoteModal";
import { logout } from "../../redux/slices/userSlice";

const MainNavbar = ({ setSearch }) => {
  const [modalShow, setModalShow] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
    history.go("/login");
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Navbar.Brand>Splash Notes</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll></Nav>
            <Form className="d-flex">
              <Button
                className="me-2"
                variant="outline-info"
                onClick={() => setModalShow(true)}>
                Create
              </Button>
              <FormControl
                type="search"
                placeholder="Search"
                aria-label="Search"
                className="me-5 hide-search"
                onChange={(e) => setSearch(e.target.value)}
              />
              <Link to="/profile">
                <Button className="me-2" variant="outline-info">
                  Profile
                </Button>
              </Link>
              <Button
                className="me-2"
                variant="outline-info"
                onClick={logoutHandler}>
                Logout
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <CreateNoteModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
};

export default MainNavbar;
