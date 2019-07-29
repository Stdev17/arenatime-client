import React from 'react';

import {
  Container,
  Card
} from 'react-bootstrap';

import { Register } from './Register';
import { Search } from './Search';
import '../css/container.css';

export class pageSearch extends React.Component {
  render() {
    return (
      <div className="top">
      <Container>
        <Card>
          <Search/>
        </Card>
      </Container>
      </div>
    );
  }
}
export class pageRegister extends React.Component {
  render() {
    return (
      <div className="top">
      <Container>
        <Card>
          <Register/>
        </Card>
      </Container>
      </div>
    );
  }
}