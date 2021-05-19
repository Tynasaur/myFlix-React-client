import React from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";

import { Link } from "react-router-dom";

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;
    // const FavoriteComponent = props.FavoriteComponent;

    return (
      <Card>
        <div className="fav-image">
          <Card.Img variant="top" src={movie.ImagePath} />
          <div className="overlay d-flex align-items-center"></div>
          <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text>{movie.Description}</Card.Text>
            <Link to={`/movies/${movie._id}`}>
              <Button variant="link">Open</Button>
            </Link>
            {/* <FavoriteComponent /> */}
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
