import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PropTypes from "prop-types";

export class DirectorView extends React.Component {
  render() {
    // const directorSearch = (movie) => movie.Director.Name === match.params.name;
    const { director, onBackClick } = this.props;

    return (
      <Row>
        <Col>
          <Card className="director-view">
            <Card.Body>
              <Card.Title>Name: {director.Name}</Card.Title>
              <Card.Text>Biography: {director.Bio}</Card.Text>
              <Card.Text>Birthday: {director.Birthday}</Card.Text>
              {/* <Card.Text>Other movies directed by {director.Name}</Card.Text> */}
              {/* directorSearch */}
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

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birthday: PropTypes.string,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
