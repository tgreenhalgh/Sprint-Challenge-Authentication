import React from 'react';
import styled from 'styled-components';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

const Div = styled('div')`
  background-color: #222;
  height: 100px;
  padding: 20px;
  color: white;
`;
class Header extends React.Component {
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

  handleLogout() {
    localStorage.removeItem('jwt');
  }

  render() {
    return (
      <React.Fragment>
        <Div>
          <span role="img" aria-label="dad with family">
            👨‍👧‍👦
          </span>{' '}
          Dad Jokes!! The best kind{' '}
          <span role="img" aria-label="dad with family">
            👨‍👧‍👦
          </span>
          {this.state.loggedin ? (
            <div>
              <Link style={{ textDecoration: 'none' }} to="/main">
                <Button onClick={this.handleLogout}>Logout</Button>
              </Link>
            </div>
          ) : null}
        </Div>
      </React.Fragment>
    );
  }
}

export default Header;
