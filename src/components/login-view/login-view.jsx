import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router";

export function LoginView() {
  const [username, setUsername] = useState(""),
    [password, setPassword] = useState(""),
    [redirect, setRedirect] = usestate("false");

  const handleSubmit = (e) => {
    e.preventDefault();
    //Send a request to the server for authentication
    axios
      .post("https://thainas-myflix.herokuapp.com/login", {
        Username: username,
        Password: password,
      })
      .then(response => {
        onLogin(response.data);
        setRedirect(true);
      })
      .catch((e) => {
        console.log("no such user");
      });
  };

  if (redirect) return <Redirect to={"/"} />;

  return (
    <Form>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          placeholder="me@google.com"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
}
