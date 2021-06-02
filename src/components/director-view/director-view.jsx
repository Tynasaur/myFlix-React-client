import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PropTypes from "prop-types";

import '../../index.scss';
import './director-view.scss';


export class DirectorView extends React.Component {
  render() {
    // const directorSearch = (movie) => movie.Director.Name === match.params.name;
    const { director, onBackClick } = this.props;

    return (
      <Row>
        <div style={{ backgroundColor: "#1B1D24"}} >
          <div className="director-view" style={{ backgroundColor: "#1E2127", width: "700px", minHeight: "1069px"}}>
            <Card.Body>
              <h2 style={{ padding: "10px 10px", textAlign: "center", color: 'white'}}>{director.Name}</h2>
              <p style={{ color: 'white'}}>Biography {director.Bio}</p>
              <div>Born {director.Birthday}</div>
              {/* <div>Died {director.Deathdate}</div> */}

              {/* <Card.Text>Other movies directed by {director.Name}</Card.Text> */}
              {/* directorSearch */}
            </Card.Body>
            <button className="my-flix" onClick={() => onBackClick()}>
              Back
            </button>
          </div>
        </div>
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
