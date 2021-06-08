import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";

import "./genre-view.scss";

export class GenreView extends React.Component {
  render() {
    const { genre, onBackClick } = this.props;

    return (
      <div className="genre-view">
        <Card style={{ backgroundColor: "#1E2127" }}>
          <Card.Body>
            <Card.Title style={{ color: "white" }}>{genre.Name}</Card.Title>
            <Card.Text>Description:</Card.Text>
            <Card.Text> {genre.Description}</Card.Text>
            <Button onClick={() => onBackClick()}>Back</Button>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
