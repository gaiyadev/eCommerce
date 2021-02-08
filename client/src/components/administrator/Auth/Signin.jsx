import React, { useState } from "react";
import { Card, Form, Button, Container, Col, Row } from "react-bootstrap";
import { useQuery } from "@apollo/client";
import Notiflix from "notiflix";
import { useHistory } from "react-router-dom";
import { LOGIN_ADMIN } from "../../../apollos/queries/admin";

const SignIn = () => {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const { error, data } = useQuery(LOGIN_ADMIN, {
    variables: { email: email, password: password },
        // pollInterval: 3444500,
  });

  const submitHandler = (event) => {
    event.preventDefault();
    setLoading(true);
    if (data) {
      setLoading(false);
      console.log(data);
      const alert = data.loginAdmin.message;
      setMessage(alert);
      Notiflix.Notify.Success(`${message}`);

      const token = data.loginAdmin.token;
      localStorage.setItem("jwt", token);

      const _id = data.loginAdmin._id;
      const email = data.loginAdmin.email;
      const username = data.loginAdmin.username;

      const admin = {
        _id,
        email,
        username,
      };
      localStorage.setItem("admin", JSON.stringify(admin));
      history.push("/home");
    }
    if (error) {
      setLoading(false);
      setLoading(false);
      const errr = error.networkError.result.errors[0].message;
      setErrMsg(errr);
      Notiflix.Notify.Failure(`${errMsg}`);
      console.log({ error });
    }
  };

  return (
    <div>
      <Container fluid="true">
        <Row>
          <Col md={3}></Col>
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Title color="primary--text">ADMIN LOGIN</Card.Title>

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
                    {loading ? "Login.." : "Login"}
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
