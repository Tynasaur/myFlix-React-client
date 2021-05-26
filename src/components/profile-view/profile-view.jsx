import axios from "axios";
import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import { Form, FormControl } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";


export class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      UsernameError: "",
      EmailError: "",
      PasswordError: "",
      favoriteMovies: [],
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    this.getUser(accessToken);
  }

  getUser(token) {
    // console.log(localStorage.getItem("user"));
    let url =
      "https://thainas-myflix.herokuapp.com/users/" +
      localStorage.getItem("user");
    axios
      .get(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        //console.log(response);
        this.setState({
          username: response.data.Username,
          password: response.data.Password,
          email: response.data.Email,
          favoriteMovies: response.data.FavoriteMovies,
        });
      });
  }


  addFavoriteMovie( movieId) {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    axios
      .post(`https://thainas-myflix.herokuapp.com/users/${user}/${movieId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((user) => {
        console.log(user.movies);
        localStorage.setItem("user");
      })
      .catch((err) => {
        console.log(err.response);
      });
  }
  
  removeFavoriteMovie() {
    const token = localStorage.getItem("token");
    const url =
      "https://thainas-myflix.herokuapp.com/users/" +
      localStorage.getItem("user") +
      "/movies/" +
      m._id;
    axios
      .delete(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
       
      });
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
    console.log("logout successful");
    alert("You have been successfully logged out");
    window.open("/", "_self");
  }

  handleDelete() {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    axios
      .delete(`https://thainas-myflix.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert(user + " has been deleted.");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.location.pathname = "/";
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleUpdate(e) {
    let token = localStorage.getItem("token");
    // console.log({ token });
    let user = localStorage.getItem("user");
    console.log(this.state);
    // let setisValid = this.formValidation();
    {
      console.log(this.props);
      console.log(this.state);
      axios
        .put(
          `https://thainas-myflix.herokuapp.com/users/${user}`,
          {
            Username: this.state.Username,
            Password: this.state.Password,
            Email: this.state.Email,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((response) => {
          const data = response.data;
          localStorage.setItem("user", data.Username);
          console.log(data);
          alert(user + " has been updated.");
          console.log(response);
        })
        .catch(function (error) {
          console.log(error.response.data);
        });
    }
  }

  handleChange(e) {
    let { name, value } = e.target;
    // console.log(name, value);
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { movies } = this.props;

    const FavoriteMovies = movies.filter((movie) => {
      // return this.state.FavoriteMovies.includes(m._id);
    });
    console.log(FavoriteMovies);

    if (!movies) alert("Please sign in");
    return (
      <div className="userProfile" style={{ display: "flex" }}>
        <Container>
          <Row>
            <Col>
              <Row>
                <div className="favoriteMovies">
                  <h5>Favorite Movies</h5>
                  {FavoriteMovies.map((movie) => {
                    return (
                      <div key={m._id}>
                        <Card>
                          <Card.Img variant="top" src={movie.ImagePath} />
                          <Card.Body>
                            <Link to={`/movies/${m._id}`}>
                              <Card.Title>{movie.Title}</Card.Title>
                            </Link>
                          </Card.Body>
                        </Card>
                        <Button onClick={() => this.removeFavoriteMovie(movie)}>
                          Remove
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </Row>

              <Row>
                <Form>
                  <Form.Group controlId="formUsername">
                    <h5>Username: </h5>
                    <Form.Label>{this.state.username}</Form.Label>
                  </Form.Group>
                  <Form.Group controlId="formEmail">
                    <h5>Email:</h5>
                    <Form.Label>{this.state.email}</Form.Label>
                  </Form.Group>
                  <Form.Group controlId="formDate"></Form.Group>
                </Form>
              </Row>
              <Row>
                <Button
                  onClick={() => {
                    this.onLoggedOut();
                  }}
                >
                  Logout
                </Button>
              </Row>
              <Row>
                <Button onClick={() => this.handleDelete()}>
                  Delete Account
                </Button>
              </Row>
            </Col>
            <Col>
              <Row>
                <Form.Group>
                  <h5>Username:</h5>
                  <FormControl
                    size="sm"
                    type="text"
                    name="Username"
                    value={this.state.Username}
                    onChange={(e) => this.handleChange(e)}
                    placeholder="Change username"
                  />
                </Form.Group>
              </Row>

              <Row>
                <Form.Group controlId="formPassword">
                  <h5>Password: </h5>
                  <FormControl
                    size="sm"
                    type="password"
                    name="Password"
                    value={this.state.Password}
                    onChange={(e) => this.handleChange(e)}
                    placeholder="Enter your password or Change password"
                  />
                </Form.Group>
              </Row>

              <Row>
                <Form.Group controlId="formEmail">
                  <h5>Email: </h5>
                  <FormControl
                    size="sm"
                    type="email"
                    name="Email"
                    value={this.state.Email}
                    onChange={(e) => this.handleChange(e)}
                    placeholder="Change Email"
                  />
                </Form.Group>
              </Row>

              <Row>
                <Link to={`/users/${this.state.Username}`}>
                  <Button
                    type="link"
                    size="md"
                    block
                    onClick={(e) => this.handleUpdate(e)}
                  >
                    Save changes
                  </Button>
                </Link>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
