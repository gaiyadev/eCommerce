import React, { useState } from "react";
import { Card, Form, Button, Container, Col, Row } from "react-bootstrap";
import Navbar from "../../components/Navigation/Navbar";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../apollos/mutations/user";
import Notiflix from "notiflix";
import { useHistory } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errMsg, setErrMsg] = useState("");
  let history = useHistory();

  const [loginUser] = useMutation(LOGIN_USER);

  const submitHandler = (event) => {
    event.preventDefault();
    setLoading(true);
    loginUser({
      variables: {
        email: email,
        password: password,
      },
    })
      .then((res) => {
        setLoading(false);
        const alert = res.data.loginUser.message;
        setMessage(alert);
        Notiflix.Notify.Success(`${message}`);

        const token = res.data.loginUser.token;
        localStorage.setItem("jwt", token);

        const _id = res.data.loginUser._id;
        const email = res.data.loginUser.email;
        const username = res.data.loginUser.username;

        const user = {
          _id,
          email,
          username,
        };
        localStorage.setItem("user", JSON.stringify(user));
        history.push("/dashboard");
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
                <Card.Title color="primary--text">LOGIN</Card.Title>
                <Form onSubmit={submitHandler}>
                  <Form.Group controlId="formBasicEmail">
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

                  <Form.Group controlId="formBasicPassword">
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
                  <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Remember me" />
                  </Form.Group>
                  <Button block size="lg" variant="primary" type="submit">
                    {loading ? "Login..." : "Login"}
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
