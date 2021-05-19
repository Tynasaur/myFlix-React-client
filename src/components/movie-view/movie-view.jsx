import React from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

import { Link } from "react-router-dom";

export class MovieView extends React.Component {
  //  handleSubmit = (e) => {
  //       e.preventDefault();
  //       const favMovie = { title, movieId, description }
  //       const title = this.props.Title
  //       const movieId = this.props._id

  //       // addToFavorites(username, match.params.title);
  //       // getProfile(username, token);
  //     }; //edit

  render() {
    const { movie, onBackClick } = this.props;

    console.log(this.props, "movielog");

    // const goBack = () => {
    //   history.push("/");
    // }; //edit

    return (
      <Card>
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>Title: {movie.Title}</Card.Title>
          <Card.Text>Description: {movie.Description}</Card.Text>
        </Card.Body>
        <Link to={`/directors/${movie.Director.Name}`}>
          <Button variant="link">Director: {movie.Director}</Button>
        </Link>

        <Link to={`/genres/${movie.Genre}`}>
          <Button variant="link">Genre: {movie.Genre}</Button>
        </Link>
        {/* <Button className="" onClick={(e) => handleSubmit(e)}>
          Add to favorite
        </Button> */}
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
