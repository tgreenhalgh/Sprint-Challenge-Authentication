import React from 'react';
import styled from 'styled-components';
import { Button } from 'reactstrap';

const Div = styled('div')`
  background-color: #222;
  height: 100px;
  padding: 20px;
  color: white;
`;

const Header = () => (
  <Div>
    testing
    <Button>holla</Button>
  </Div>
);

export default Header;
