import React from 'react';
import axios from 'axios';
import Joke from './Joke';

class Jokes extends React.Component {
  constructor() {
    super();
    this.state = {
      jokes: [],
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('jwt');
    const requestOptions = {
      headers: { Authorization: token },
    };
    // axios.defaults.withCredentials = true;
    axios
      .get('http://localhost:5000/api/jokes', requestOptions)
      .then(res => {
        // we're sent an array of jokes
        let uniqueArr = [];
        this.setState({ jokes: res.data });
      })
      .catch(err => {
        alert('You must be logged in to continue... Redirecting');
        setTimeout(() => {
          this.props.history.push('/login');
        }, 500);
        console.error('axios err:', err);
      });
  }

  render() {
    return this.state.jokes.map(j => <Joke key={j.id} joke={j} />);
  }
}

export default Jokes;
