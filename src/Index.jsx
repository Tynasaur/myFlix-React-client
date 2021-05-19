import React from "react";
import ReactDOM from "react-dom";
import MainView from "./components/main-view/main-view";
import Container from "react-bootstrap/Container";

// Import statement to indicate you need to bundle `./index.scss`
import "./index.scss";

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
  render() {
    return (
      <Container>
        <MainView />
      </Container>
    );
  }
}

export default MainView;

//Finds the root of your app
const container = document.getElementsByClassName("app-container")[0];

//Tells React to render your app in the root DDOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);
