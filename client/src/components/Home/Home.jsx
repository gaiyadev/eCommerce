import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import Cart from "../Shop/Product";

const Home = () => {
  return (
    <div>
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
