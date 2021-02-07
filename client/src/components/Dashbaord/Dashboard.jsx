import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import BreadCrum from "../../components/Dashbaord/Header/BreadCrum";

const Dashboard = () => {
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
      <BreadCrum />
      <Container>
        <h5>Welcome {email} </h5>
      </Container>
    </div>
  );
};

export default Dashboard;
