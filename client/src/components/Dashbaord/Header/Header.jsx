import { Breadcrumb } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";

import React from "react";
const Header = () => {
  let history = useHistory();

  const logoutHandler = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    history.push("/signin");
  };

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
        <Breadcrumb.Item>
          <NavLink to="/dashboard/profile">Data</NavLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <button
            className="btn btn-danger"
            onClick={logoutHandler}
            type="submit"
          >
            Logout
          </button>{" "}
        </Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
};

export default Header;
