import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";

export class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      favoriteMovies: [],
    };
  }

  getUsers(token) {
    axios
      .get("https://thainas-myflix.herokuapp.com/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the state
        this.setState({
          users: response.data.Username,
          password: response.data.Password,
          email: response.data.Email,
          favoriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }



  render() {
    const { movies } = this.props;

    
  

    if (!movies) alert("Please sign in, or create account.");
    return (
      <Row className="profile-view">
        <Card>
          <Card.Body>
            <Card.Text></Card.Text>
          </Card.Body>

          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              autoComplete="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
        </Card>
      </Row>
    );
  }
}
