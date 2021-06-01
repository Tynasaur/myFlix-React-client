import React from "react";
import ReactDOM from "react-dom";
import Container from 'react-bootstrap/Container';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import moviesApp from './reducers/reducers';
// import { devToolsEnhancer } from 'redux-devtools-extension';

import MainView from "./components/main-view/main-view";
// Import statement to indicate you need to bundle `./index.scss`
import "./index.scss";


const store = createStore(moviesApp);
// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container>
          <MainView />
        </Container>
      </Provider>
    );
  }
}

export default MainView;

//Finds the root of your app
const container = document.getElementsByClassName("app-container")[0];

//Tells React to render your app in the root DDOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);
