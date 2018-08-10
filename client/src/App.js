import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from './components/Header';
import Main from './components/Main';
import Login from './components/Login';
import Jokes from './components/Jokes';
import SignUp from './components/SignUp';
import { withRouter } from 'react-router';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Route path="/" component={Header} />
        <Route exact path="/" component={Main} />
        <Route path="/login" component={Login} />
        <Route path="/jokes" component={Jokes} />
        <Route path="/signup" component={SignUp} />
        <Route path="/main" component={Main} />
      </div>
    );
  }
}

export default withRouter(App);
