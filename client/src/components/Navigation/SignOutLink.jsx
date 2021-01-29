import React from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";

const SignOutLink = () => {
  return (
    <div>
      <Nav.Link>
        <NavLink id="link" to="/">
          SignOut
        </NavLink>
      </Nav.Link>
    </div>
  );
};

export default SignOutLink;
