import React from 'react';
import { Button } from 'reactstrap';

class Main extends React.Component {
  handleButtonClick = () => {
    this.props.history.push('/jokes');
  };

  render() {
    return (
      <div>
        Welcome to Dad Jokes!!!
        <br />
        <br />
        <Button onClick={this.handleButtonClick}>Jokes</Button>
      </div>
    );
  }
}

export default Main;
