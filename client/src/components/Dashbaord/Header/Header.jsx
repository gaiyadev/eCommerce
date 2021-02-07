import React, { useEffect, useState } from "react";
import { Breadcrumb } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Header = () => {
  let history = useHistory();

  const logoutHandler = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    history.push("/signin");
  };

  const [email, setEmail] = useState("");
  const isAuthenticated = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setEmail(user["username"]);
    }
  };

  useEffect(() => {
    isAuthenticated();
  }, []);

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
          </button>
        </Breadcrumb.Item>
        <h6 style={{margin: '10px'}}>
          
          Welcome <span style={{color: 'red', margin: '5px'}} >{email}</span>
        </h6>
      </Breadcrumb>
    </div>
  );
};

export default Header;
