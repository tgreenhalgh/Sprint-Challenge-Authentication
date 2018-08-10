import React from 'react';
import { Card, CardText, CardBody, Button } from 'reactstrap';

class Joke extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }
  handleClick = () => {
    console.log('CLICKED');
    this.setState({ show: true });
  };

  render() {
    return (
      <div>
        <Card>
          <CardBody>
            <CardText>{this.props.joke.setup}</CardText>

            {this.state.show ? (
              <CardText>{this.props.joke.punchline}</CardText>
            ) : (
              <Button onClick={this.handleClick}>show answer</Button>
            )}
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default Joke;
