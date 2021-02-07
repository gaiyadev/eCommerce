import React, { useState, useEffect } from "react";
import { Breadcrumb } from "react-bootstrap";
import { NavLink, useHistory } from "react-router-dom";

const Header = () => {
  let history = useHistory();

  const logoutHandler = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("admin");
    history.push("/admin");
  };

  const [email, setEmail] = useState("");
  const isAuthenticated = () => {
    const admin = JSON.parse(localStorage.getItem("admin"));
    if (admin) {
      setEmail(admin["username"]);
    }
  };

  useEffect(() => {
    isAuthenticated();
  }, []);

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
        <Breadcrumb.Item>
          <button
            className="btn btn-danger"
            onClick={logoutHandler}
            type="submit"
          >
            Logout
          </button>
        </Breadcrumb.Item>
        <h6 style={{ margin: "10px" }}>
          Welcome <span style={{ color: "red", margin: "5px" }}>{email}</span>
        </h6>
      </Breadcrumb>
    </div>
  );
};

export default Header;
