import React from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";

import { Link } from "react-router-dom";

import "./movie-card.scss";

export class MovieCard extends React.Component {
  addFavoriteMovie(movieId) {
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

  render() {
    const { movie } = this.props;

    return (
      <div className="movie-card-div">
        <Card className="movie-card" style={{ backgroundColor: "#1E2127" }}>
          <Card.Title style={{ color: "white" }}>{movie.Title}</Card.Title>
          <Card.Img
            className="movie-image"
            variant="top"
            src={movie.ImagePath}
          />
          <Card.Body>
            <div className="button">
              <Link to={`/movies/${movie._id}`}>
                <Button variant="link">See Details</Button>
              </Link>

              <Button onClick={() => this.addFavoriteMovie(movie)}>
                add Favorite
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
};
