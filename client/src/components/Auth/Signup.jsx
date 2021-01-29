import React from "react";
import { Card, Form, Button, Container, Col, Row } from "react-bootstrap";

const Signup = () => {
  return (
    <div>
      <Container fluid="true">
        <Row>
          <Col md={3}></Col>
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Title color="primary--text">REGISTER</Card.Title>

                <Form>
                  <Form.Group controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                                          size="lg"
                                          required
                      type="email"
                      placeholder="Enter email"
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      size="lg"
                      required
                      type="text"
                      placeholder="Enter username"
                    />
                  </Form.Group>

                  <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      size="lg"
                      required
                      type="password"
                      placeholder="Password"
                    />
                  </Form.Group>
                  <Button size="lg" block variant="primary" type="submit">
                    Register
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}></Col>
        </Row>
      </Container>
    </div>
  );
};

export default Signup;
