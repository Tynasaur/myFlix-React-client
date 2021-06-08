import React from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import { Link } from "react-router-dom";
import "./movie-view.scss";

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Card className="movie-view" style={{ backgroundColor: "#1E2127" }}>
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title style={{ color: "white" }}>{movie.Title}</Card.Title>
          <Card.Text>Description: {movie.Description}</Card.Text>
          <Card.Text>
            Director:
            <Link to={`/directors/${movie.Director.Name}`}>
              <Button variant="link"> {movie.Director.Name}</Button>
            </Link>
          </Card.Text>
          <Card.Text>
            Genre:
            <Link to={`/genres/${movie.Genre.Name}`}>
              <Button variant="link"> {movie.Genre.Name}</Button>
            </Link>
          </Card.Text>
          <Button onClick={() => onBackClick()}>Back</Button>
        </Card.Body>
      </Card>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
