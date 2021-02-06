import React, { useState } from "react";
import { Card, Form, Button, Container, Col, Row } from "react-bootstrap";
import Navbar from "../../components/Navigation/Navbar";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../../apollos/mutations";
import Notiflix from "notiflix";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState(false);
  const [message, setMessage] = useState(false);

  const [createUser] = useMutation(CREATE_USER);

  const submitHandler = (event) => {
    event.preventDefault();
    setLoading(true);
    createUser({
      variables: {
        email: email,
        username: username,
        password: password,
      },
    })
      .then((res) => {
        setLoading(false);
        setMessage(res.data.createUser.message);
        Notiflix.Notify.Success(`${message}`);
      })
      .catch((err) => {
        setLoading(false);
        const error = err.networkError.result.errors[0].message;
        setErrMsg(error);
        Notiflix.Notify.Failure(`${errMsg}`);
      });
  };

  return (
    <div>
      <Navbar />
      <Container fluid="true">
        <Row>
          <Col md={3}></Col>
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Title color="primary--text">REGISTER</Card.Title>
                <Form onSubmit={submitHandler}>
                  <Form.Group controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      size="lg"
                      type="email"
                      onChange={(event) => {
                        const newEmail = event.target.value;
                        setEmail(newEmail);
                      }}
                      placeholder="Enter email"
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      size="lg"
                      type="text"
                      onChange={(event) => {
                        const newUsername = event.target.value;
                        setUsername(newUsername);
                      }}
                      placeholder="Enter username"
                    />
                  </Form.Group>

                  <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      size="lg"
                      onChange={(event) => {
                        const newPassword = event.target.value;
                        setPassword(newPassword);
                      }}
                      type="password"
                      placeholder="Password"
                    />
                  </Form.Group>
                  <Button size="lg" block variant="primary" type="submit">
                    {loading ? "Sending" : "Register"}
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
