import React from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

import { Link } from "react-router-dom";

export class MovieView extends React.Component {


   handleSubmit = (e) => {
        e.preventDefault();
        const favoriteMovie = { title, movieId, description }
        const title = this.props.Title
        const movieId = this.props._id

        addToFavorites(username, match.params.title);
        getProfile(username, token);
      }; //edit

  render() {
    const { movie, onBackClick } = this.props;

    

 
    return (
      <Card>
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>Title: {movie.Title}</Card.Title>
          <Card.Text>Description: {movie.Description}</Card.Text>
        </Card.Body>
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
    
     
        <Button onClick={() => onBackClick()} className="movie-view">
          Back
        </Button>
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
