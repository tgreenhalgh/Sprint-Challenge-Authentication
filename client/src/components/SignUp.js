import React from 'react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Input } from 'reactstrap';

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      error: '',
      modal: false,
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    // the signup endpoint wants a user object {username, password}
    const { username, password } = this.state;
    const USER = { username, password };
    axios
      .post('http://localhost:5000/api/register', USER)
      .then(res => {
        // we're sent a JWT token
        const token = res.data;
        // stash it for later use
        localStorage.setItem('jwt', token);
        this.setState({ username: '', password: '' });
        this.props.history.push('/jokes');
      })
      .catch(err => {
        // console.log('ERR', err);
        if (err.response.data.error.includes('UNIQUE')) {
          this.setState({
            error: 'That user already exists. Please choose another.',
            username: '',
            password: '',
          });
        } else {
          this.setState({ error: err.response.data.error });
        }
        this.toggle();
        // console.error('axios err:', err);
        console.log('ERR?', err.response.data);
      });
  };

  handleInput = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <h1>Sign up to see the Best Jokes Ever!</h1>
        <br />
        <FormGroup>
          <Label for="Username">Username</Label>
          <Input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleInput}
            placeholder="username"
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleInput}
            placeholder="password"
          />
        </FormGroup>
        <Button>Submit</Button>
        <div>
          <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>ERROR</ModalHeader>
            <ModalBody>{this.state.error}</ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.toggle}>
                Close
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </Form>
    );
  }
}

export default SignUp;
