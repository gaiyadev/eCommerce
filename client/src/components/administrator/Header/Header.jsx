import { Breadcrumb } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import React from "react";
const Header = () => {
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>
          <NavLink to="/">Home</NavLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <NavLink to="/home">Dashbaord</NavLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <NavLink to="/home/add">Add</NavLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>
          <NavLink to="/home/profile">Data</NavLink>
        </Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
};

export default Header;
