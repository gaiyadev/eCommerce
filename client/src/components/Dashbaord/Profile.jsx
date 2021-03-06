import React, { useState, useEffect } from "react";
import BreadCrum from "./Header/BreadCrum";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import {
  CHANGE_PASSWORD,
  GET_USER_INFO,
  UPDATE_USER_INFO,
} from "../../apollos/mutations/user";
import { useMutation } from "@apollo/client";
import Notiflix from "notiflix";
import { useHistory } from "react-router-dom";

const UserProfile = () => {
  let history = useHistory();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const [current_password, setCurrent_password] = useState("");
  const [new_password, setNew_password] = useState("");
  const [retype_password, setRetype_password] = useState("");

  useEffect(() => {
    user();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [getUser] = useMutation(GET_USER_INFO);
  const [changeProfile] = useMutation(UPDATE_USER_INFO);

  const user = () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    getUser({
      variables: {
        userId: userData["_id"],
      },
    })
      .then((res) => {
        const email = res.data.getUser[0].email;
        const username = res.data.getUser[0].username;
        setEmail(email);
        setUsername(username);
      })
      .catch((err) => console.log(err));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const userData = JSON.parse(localStorage.getItem("user"));

    changeProfile({
      variables: {
        userId: userData["_id"],
        email: email,
        username: username,
      },
    })
      .then((res) => {
        const alert = res.data.changeProfile.message;
        setMessage(alert);
        Notiflix.Notify.Success(`${message}`);
      })
      .catch((err) => {
        const error = err.networkError.result.errors[0].message;
        setErrMsg(error);
        Notiflix.Notify.Failure(`${errMsg}`);
      });
  };

  // change password
  const [changePassword] = useMutation(CHANGE_PASSWORD);
  const changePasswordHandler = (event) => {
    event.preventDefault();
    setLoading(true);
    const userData = JSON.parse(localStorage.getItem("user"));
    changePassword({
      variables: {
        userId: userData["_id"],
        password: current_password,
        new_password: new_password,
        confirm_password: retype_password,
      },
    })
      .then((res) => {
        setLoading(false);
        const alert = res.data.changePassword.message;
        setMessage(alert);
        Notiflix.Notify.Success(`${message}`);
        history.push("/signin");
        localStorage.removeItem("user");
        localStorage.removeItem("jwt");
      })
      .catch((err) => {
        setLoading(false);
        const error = err.networkError.result.errors[0].message;
        setErrMsg(error);
        Notiflix.Notify.Failure(`${errMsg}`);
      });
  };

  return (
    <Container>
      <BreadCrum />
      <h1 className="text-center">User Profile</h1> <br />
      <br />
      <Row>
        <Col md={6}>
          <h5>Change Password</h5>
          <br />
          <Form onSubmit={changePasswordHandler}>
            <Form.Group controlId="current_password">
              <Form.Label>Current Password</Form.Label>
              <Form.Control
                type="password"
                size="lg"
                name="current_password"
                onChange={(event) => {
                  const current_password = event.target.value;
                  setCurrent_password(current_password);
                }}
                placeholder="Enter current password"
              />
            </Form.Group>

            <Form.Group controlId="new_password">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                size="lg"
                onChange={(event) => {
                  const newPassword = event.target.value;
                  setNew_password(newPassword);
                }}
                name="new_password"
                placeholder="New Password"
              />
            </Form.Group>
            <Form.Group controlId="retype_password">
              <Form.Label>Retype Password</Form.Label>
              <Form.Control
                type="password"
                size="lg"
                onChange={(event) => {
                  const retype_password = event.target.value;
                  setRetype_password(retype_password);
                }}
                name="retype_password"
                placeholder="Retype New Password"
              />
            </Form.Group>

            <Button block size="lg" variant="primary" type="submit">
              {loading ? "sending.." : "Change password"}
            </Button>
          </Form>
        </Col>
        <Col md={6}>
          <h5>Update Info</h5> <br />
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                size="lg"
                value={email}
                name="email"
                type="email"
                onChange={(event) => {
                  const newEmail = event.target.value;
                  setEmail(newEmail);
                }}
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                name="username"
                type="text"
                value={username}
                size="lg"
                onChange={(event) => {
                  const newUsername = event.target.value;
                  setUsername(newUsername);
                }}
                placeholder="Username"
              />
            </Form.Group>

            <Button block size="lg" variant="primary" type="submit">
              Update
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
