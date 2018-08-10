import React from 'react';
import { Button } from 'reactstrap';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedin: false,
    };
  }

  componentDidMount() {
    if (localStorage.getItem('jwt')) {
      this.setState({ loggedin: true });
    }
  }

  componentWillReceiveProps() {
    if (localStorage.getItem('jwt')) {
      this.setState({ loggedin: true });
    } else {
      this.setState({ loggedin: false });
    }
  }

  handleJokeClick = () => {
    this.props.history.push('/jokes');
  };

  handleLoginClick = () => {
    this.props.history.push('/login');
  };

  handleRegisterClick = () => {
    this.props.history.push('/signup');
  };

  render() {
    return (
      <div>
        Welcome to Dad Jokes!!!
        <br />
        <br />
        {this.state.loggedin ? (
          <Button onClick={this.handleJokeClick}>Jokes</Button>
        ) : (
          <div>
            <Button onClick={this.handleLoginClick}>Log in</Button>
            <Button onClick={this.handleRegisterClick}>Regsiter</Button>
          </div>
        )}
      </div>
    );
  }
}

export default Main;
