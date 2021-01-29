import React from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";

const SignOutLink = () => {
  return (
    <div>
      <Nav>
        <NavLink id="link" to="/">
          SignOut
        </NavLink>
      </Nav>
    </div>
  );
};

export default SignOutLink;
