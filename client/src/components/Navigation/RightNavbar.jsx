import React from "react";
import { Navbar, Button, Nav, Container } from "react-bootstrap";
import "./Rightnav.css";
import Logo from "./Logo";
import { NavLink } from "react-router-dom";
import SignOutLink from "./SignOutLink";

const RightNavbar = () => {
  return (
    <div>
      <Container fluid="true">
        <Navbar fixed="top" bg="primary" variant="dark" expand="lg">
          <Logo />
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" fixed="top">
            <Nav className="ml-auto">
              <Nav>
                <NavLink id="link" to="/">
                  Home
                </NavLink>
              </Nav>
              <Nav id="link">
                <NavLink id="link" to="/signup">
                  Signup
                </NavLink>
              </Nav>
              <Nav>
                <NavLink id="link" to="/signin">
                  Signin
                </NavLink>
              </Nav>
              <SignOutLink />
            </Nav>
          </Navbar.Collapse>
          <a href="/cart">
            <Button className="btn btn-danger">
              Carts <span>0</span>
            </Button>
          </a>
        </Navbar>
      </Container>
      <br />
      <br />
    </div>
  );
};

export default RightNavbar;
