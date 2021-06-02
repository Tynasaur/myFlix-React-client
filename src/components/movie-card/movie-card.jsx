import React from "react";
import PropTypes from "prop-types";
import { Card, Button, Row } from "react-bootstrap";

import { Link } from "react-router-dom";

import './movie-card.scss';

export class MovieCard extends React.Component {

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

  render() {
    const { movie } = this.props;

    return (
      <div>
        <div className="fav-image">
          <Card.Img variant="top" src={movie.ImagePath} />
          <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text>{movie.Description}</Card.Text>
            <Link to={`/movies/${movie._id}`}>
              <Button variant="link">Open</Button>
            </Link>
            <Row>
              {/* <Button onClick={() => this.handleAdd(movie)}>
                Add to favourite
              </Button> */}
              <button onClick={() => this.addFavoriteMovie(movie)}>
                add Favorite
              </button>
            </Row>
          </Card.Body>
        </div>
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
