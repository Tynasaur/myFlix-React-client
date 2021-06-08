import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import PropTypes from "prop-types";

import "./director-view.scss";

export class DirectorView extends React.Component {
  render() {
    // const directorSearch = (movie) => movie.Director.Name === match.params.name;
    const { director, onBackClick } = this.props;

    return (
      <Col>
        <Card className="director-view" style={{ backgroundColor: "#1E2127" }}>
          <Card.Body>
            <Card.Title style={{ color: "white" }}>{director.Name}</Card.Title>
            <Card.Text>Biography: </Card.Text>
            <Card.Text>{director.Bio}</Card.Text>
            <Card.Text>Birthday:</Card.Text>
            <Card.Text>{director.Birthday}</Card.Text>
            <Button onClick={() => onBackClick()}>Back</Button>
          </Card.Body>
        </Card>
      </Col>
    );
  }
}
// style={{ backgroundColor: "#1E2127", width: "700px", minHeight: "1069px"}}
DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birthday: PropTypes.string,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
