import React from 'react';
import axios from 'axios';

//import { RegistrationView } from '..registration-view/registration-view';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export default class MainView extends React.Component {

  constructor(){
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null
    };
  }

  componentDidMount(){
    axios.get('https://thainas-myflix.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  // When a movie is clicked, this funciton is invoked and updates the state of the `selectedMovie` *property to the movie

  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie
    });
  }
  // When a user succesfully logd in, this fucntion jupdates the `user` property in the state to that *particular user

  onRegistered(register) {
    this.setState({
      register
    });
  }
  
  
    onLoggedIn(user) {
      this.setState({
        user
      });
    }
    // When a user successfully logs in, this function updates the `user` property in state to the *particular user
    
    onBackClick() {
      this.setState({
          selectedMovie: null
      });
  }


  render() {
    const { movies, selectedMovie, register, user } = this.state;

    if (!register) return <RegistrationView onRegistered={register => this.onRegistered(register)} />;

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />; 
    // If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView
 

        // Before the movies have been loaded
    if (movies.length === 0) return <div className="main-view" />;

    return (
      <div className="main-view">
                {/*If the state of `selectedMovie` is not null, that selected movie will be returned otherwise, all *movies will be returned*/}

     {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }}/>
         ))
        }
      </div>
    );
  }
}



