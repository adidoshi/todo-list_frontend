import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Navbar,
  Nav,
  Button,
  Form,
  FormControl,
  Container,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/userActions";

const MainNavbar = ({ setSearch }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    history.push("/login");
  };

  useEffect(() => {}, [userInfo]);

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container>
          <Link to="/" className="navbar-brand">
            Splash Notes
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="m-auto">
              <Form className="d-flex">
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="me-2"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Form>
            </Nav>

            <Nav>
              <Link to="/profile" className="navbar-brand">
                My Profile
              </Link>
              <Link to="/createnote">
                <Button variant="outline-secondary" className="text-white me-2">
                  Create Note
                </Button>
              </Link>
              <Button
                variant="outline-secondary"
                className="text-white"
                onClick={logoutHandler}>
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default MainNavbar;
