import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PropTypes from "prop-types";

export class GenreView extends React.Component {
  render() {
    const { genre, onBackClick } = this.props;

    return (
      <Row>
        <Col>
          <Card className="genre-view">
            <Card.Body>
              <Card.Title>Name: {genre.Name}</Card.Title>
              <Card.Text>Description: {genre.Description}</Card.Text>
           
              <Card.Text>Other movies in {genre.Name} genre</Card.Text>
              {/* genreSearch */}
            </Card.Body>
            <Button onClick={() => onBackClick()} className="genre-view">
          Back
        </Button>
          </Card>
        </Col>
      </Row>
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