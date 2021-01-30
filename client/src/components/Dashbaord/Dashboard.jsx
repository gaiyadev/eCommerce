import React from "react";
import { Container } from "react-bootstrap";
import BreadCrum from "../../components/Dashbaord/Header/BreadCrum";

const Dashboard = () => {
  return (
    <div>
      <BreadCrum />
      <Container>
        <h1>User</h1>
      </Container>
    </div>
  );
};

export default Dashboard;
