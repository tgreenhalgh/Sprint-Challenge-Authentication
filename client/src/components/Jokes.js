import React from 'react';
import axios from 'axios';
import Joke from './Joke';

class Jokes extends React.Component {
  constructor() {
    super();
    this.state = {
      jokes: [],
      loggedin: false,
    };
  }

  getJokes = () => {
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
        let jokes = [];
        for (let i = 0; i < res.data.length; i++) {
          let val = res.data[i];
          if (!uniqueArr.includes(val.id)) {
            uniqueArr.push(val.id);
          }
        }
        for (let i = 0; i < uniqueArr.length; i++) {
          let obj = res.data.find(function(obj) {
            return obj.id === uniqueArr[i];
          });
          jokes.push(obj);
        }
        this.setState({ jokes: jokes, loggedin: true });
      })
      .catch(err => {
        alert('You must be logged in to continue... Redirecting');
        setTimeout(() => {
          this.props.history.push('/login');
        }, 500);
        console.error('axios err:', err);
      });
  };

  componentDidMount() {
    if (localStorage.getItem('jwt')) {
      this.setState({ loggedin: true });
      this.getJokes();
    } else {
      alert('You must be logged in to continue... Redirecting');
      setTimeout(() => {
        this.props.history.push('/login');
      }, 500);
    }
  }

  render() {
    return this.state.jokes.map(j => <Joke key={j.id} joke={j} />);
  }
}

export default Jokes;
