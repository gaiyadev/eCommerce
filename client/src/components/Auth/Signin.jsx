import React from "react";
import { Card, Form, Button, Container, Col, Row } from "react-bootstrap";

const SignIn = () => {
  return (
    <div>
      <Container fluid="true">
        <Row>
          <Col md={3}></Col>
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Title color="primary--text">LOGIN</Card.Title>
                <Form>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      size="lg"
                      type="email"
                      required
                      placeholder="Enter email"
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      size="lg"
                      required
                      type="password"
                      placeholder="Password"
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Remember me" />
                  </Form.Group>
                  <Button block size="lg" variant="primary" type="submit">
                    Login
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

export default SignIn;
