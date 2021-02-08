import React, { useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Cart from "../Shop/Product";
import Navbar from "../Navigation/Navbar";

const Home = () => {
  useEffect(() => {}, []);
  return (
    <div>
      <Navbar />
      <Container>
        <Row>
          <Col md={3}>
            <Cart />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
