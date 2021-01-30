import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import Cart from "../Shop/Product";
import Navbar from "../Navigation/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />

      <Container fluid="true">
        <Row>
          <Col md={3}>
            <Cart />
          </Col>
          <Col md={3}>
            <Cart />
          </Col>
          <Col md={3}>
            <Cart />
          </Col>
          <Col md={3}>
            <Cart />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
