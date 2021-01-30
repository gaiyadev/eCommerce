import React from "react";
import BreadCrum from "../Header/BreadCrum";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const AdminProfile = () => {
  return (
    <Container>
      <BreadCrum />
      <h1 className="text-center">Admin Profile</h1> <br />
      <br />
      <Row>
        <Col md={6}>
          <h5>Change Password</h5>
          <br />
          <Form>
            <Form.Group controlId="current_password">
              <Form.Label>Current Password</Form.Label>
              <Form.Control
                type="password"
                id="current_password"
                size="lg"
                name="current_password"
                placeholder="Enter current password"
              />
            </Form.Group>

            <Form.Group controlId="new_password">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                size="lg"
                id="new_password"
                name="new_password"
                placeholder="New Password"
              />
            </Form.Group>
            <Form.Group controlId="retype_password">
              <Form.Label>Retype Password</Form.Label>
              <Form.Control
                id="retype_password"
                type="password"
                size="lg"
                name="retype_password"
                placeholder="Retype New Password"
              />
            </Form.Group>

            <Button block size="lg" variant="primary" type="submit">
              Change password
            </Button>
          </Form>
        </Col>
        <Col md={6}>
          <h5>Change Password</h5> <br />
          <Form>
            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                              size="lg"
                              id="email"
                name="email"
                type="email"
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                name="username"
                              type="text"
                              id="username"
                size="lg"
                placeholder="Username"
              />
            </Form.Group>

            <Button block size="lg" variant="primary" type="submit">
              Update Details
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminProfile;
