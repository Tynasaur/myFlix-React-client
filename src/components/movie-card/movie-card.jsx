import React from "react";
import PropTypes from "prop-types";
import { Card, Button, Row } from "react-bootstrap";

import { Link } from "react-router-dom";

export class MovieCard extends React.Component {
  
  addFavoriteMovie(user, movieId, token) {
    axios
      .post(`https://thainas-myflix.herokuapp.com/users/${user}/${movieId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((user) => {
        console.log(user.movies);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  render() {
    const { movie, addFavoriteMovie } = this.props;

    return (
      <Card>
        <div className="fav-image">
          <Card.Img variant="top" src={movie.ImagePath} />
          <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text>{movie.Description}</Card.Text>
            <Link to={`/movies/${movie._id}`}>
              <Button variant="link">Open</Button>
            </Link>
            <Row></Row>
            <Button onClick={addFavoriteMovie}>Add to favorites</Button>
            {/* <Button className="" onClick={(e) => handleSubmit(e)}>
          Add to favorite
        </Button> */}
          </Card.Body>
        </div>
      </Card>
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
