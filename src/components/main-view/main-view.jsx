import React from "react";
import axios from "axios";
// import { useState } from "react";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

//App components
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { ProfileView } from "../profile-view/profile-view";
import { RegistrationView } from "../registration-view/registration-view";
import AddFavorite from "../addFavorite/addFavorite";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

export default class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
    };
  }

  //Request that receives array of movies from myFlixAPI
  getMovies(token) {
    axios
      .get("https://thainas-myflix.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the state
        this.setState({
          movies: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getUser(token) {
    axios
      .get("https://thainas-myflix.herokuapp.com/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          users: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      this.getMovies(accessToken);
    }
  }

  onRegistered(register) {
    this.setState({
      register,
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
  }

  render() {
    // const [favorites, setFavorites] = useState([]);
    // const addFavoriteMovie = (movie) => {
    //   const newFavoriteList = [favorites, movie];
    //   setFavorites(newFavoriteList);
    // };

    const { movies, user } = this.state;

    return (
      <Router>
        <Navbar>
          <Navbar.Brand href="">myFlix</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
          <Nav>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/users/:Username">User Profile</Nav.Link>
          </Nav>
        </Navbar>

        <Row className="main-view justify-content-md-center">
          <Route
            exact
            path="/"
            render={() => {
              if (!user)
                <Row>
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
                  </Col>
                </Row>;
              return movies.map((m) => (
                <Col md={4} key={m._id}>
                  <MovieCard
                    movie={m}
                    // handleFavoritesClick={addfavoriteMovie}
                    // favoriteComponent={AddFavorite}
                  />
                </Col>
              ));
            }}
          />
          <Route
            exact
            path="/register"
            render={() => {
              if (user) return <Redirect to="/" />;
              return (
                <Col>
                  <RegistrationView />
                </Col>
              );
            }}
          />
          <Route
            path="/movies/:movieId"
            render={({ match, history }) => {
              return (
                <Col md={8}>
                  <MovieView
                    movie={movies.find((m) => m._id === match.params.movieId)}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          <Route
            path="/directors/:Name"
            render={({ match, history }) => {
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <DirectorView
                    director={
                      movies.find((m) => m.Director.Name === match.params.name)
                        .Director
                    }
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          <Route
            path="/genres/:Name"
            render={({ match, history }) => {
              if (!movies) return <div className="main-view" />;
              return (
                <GenreView
                  genre={
                    movies.find((m) => m.Genre.Name === match.params.name).Genre
                  }
                  onBackClick={() => history.goBack()}
                />
              );
            }}
          />
        </Row>

        <Route
          path="/users/:Username"
          render={({ history }) => {
            {
              return (
                <Row>
                  <Col md={8}>
                    <ProfileView user={user} movies={movies} />
                  </Col>
                  <Button
                    onClick={() => {
                      this.onLoggedOut();
                    }}
                  >
                    Logout
                  </Button>
                </Row>
              );
            }
          }}
        />
      </Router>
    );
  }
}
