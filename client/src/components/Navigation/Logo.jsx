import React from "react";
import { Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Logo = () => {
  return (
    <div>
      <Navbar.Brand>
        <NavLink style={{ color: "white" }} to="/">
          GraphQL-Store
        </NavLink>
      </Navbar.Brand>
    </div>
  );
};

export default Logo;
