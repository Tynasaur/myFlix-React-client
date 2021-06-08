import axios from "axios";
import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "../../index.scss";

import { setMovies } from "../../actions/actions";

import MoviesList from "../movies-list/movies-list";
//App components
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { LoginView } from "../login-view/login-view";
import { MovieView } from "../movie-view/movie-view";
import { ProfileView } from "../profile-view/profile-view";
import { RegistrationView } from "../registration-view/registration-view";

//Bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
//background color
document.body.style = "background: #131515;";

class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedMovie: null,
      user: null,
    };
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

  //Request that receives array of movies from myFlixAPI
  getMovies(token) {
    axios
      .get("https://thainas-myflix.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the state
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
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

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie,
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

  onRegistered(register) {
    this.setState({
      register,
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

  render() {
    let { movies } = this.props;
    let { user } = this.state;

    return (
      <Router>
        <Navbar bg="dark" variant="dark">
          <Nav.Link href="/">myFlix</Nav.Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
          <Nav>
            <Nav.Link href={`/user/${user}`}>My Account</Nav.Link>
            <Nav.Link onClick={() => this.onLoggedOut()}>Log Out</Nav.Link>
          </Nav>
        </Navbar>

        <Row className="main-view justify-content-md-center">
          <Route
            exact
            path="/"
            render={() => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;

              return <MoviesList movies={movies} />;
            }}
          />

          <Route
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
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              return (
                <Col sm={6}>
                  <MovieView
                    movie={movies.find((m) => m._id === match.params.movieId)}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          <Route
            className="main-view justify-content-md-center"
            path="/directors/:Name"
            render={({ match, history }) => {
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <DirectorView
                    director={
                      movies.find((m) => m.Director.Name === match.params.Name)
                        .Director
                    }
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          <Route
            className="main-view justify-content-md-center"
            path="/genres/:Name"
            render={({ match, history }) => {
              if (!movies) return <div className="main-view" />;
              return (
                <GenreView
                  genre={
                    movies.find((m) => m.Genre.Name === match.params.Name).Genre
                  }
                  onBackClick={() => history.goBack()}
                />
              );
            }}
          />
        </Row>

        <Route
          path="/user"
          render={() => {
            {
              return (
                <Row>
                  <Col md={12}>
                    <ProfileView user={user} movies={movies} />
                  </Col>
                </Row>
              );
            }
          }}
        />
      </Router>
    );
  }
}

let mapStateToProps = (state) => {
  return { movies: state.movies };
};

export default connect(mapStateToProps, { setMovies })(MainView);
