import { Breadcrumb } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import React from "react";
const Header = () => {
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>
          <NavLink to="/dashboard">Home</NavLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <NavLink to="/dashboard">Dashbaord</NavLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <NavLink to="/dashboard/orders">Orders</NavLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>
          <NavLink to="/dashboard/profile">Data</NavLink>
        </Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
};

export default Header;
