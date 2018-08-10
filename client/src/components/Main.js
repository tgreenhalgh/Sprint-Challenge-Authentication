import React from 'react';
import { Button } from 'reactstrap';

class Main extends React.Component {
  handleButtonClick = () => {
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
        <Button onClick={this.handleLoginClick}>Log in</Button>
        <Button onClick={this.handleRegisterClick}>Regsiter</Button>
        <Button onClick={this.handleButtonClick}>Jokes</Button>
      </div>
    );
  }
}

export default Main;
