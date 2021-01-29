import React from "react";
import { Container, Row, Col } from "react-bootstrap";
const Footer = () => {
  return (
    <div>
      <Container fluid="true">
        <Row>
          <Col md={12}>
            <p>&copy 2021 Chakra-shop</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
