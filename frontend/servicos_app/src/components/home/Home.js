import React, { Component } from 'react';
import { Jumbotron } from 'reactstrap';

export default class Home extends Component {
  render() {
    return (
      <div>
        <Jumbotron >
          <h1 className="display-3" >Bem vindo!</h1>
          <p className="lead">Sistema para cadastro de serviços.</p>
          <hr />
        </Jumbotron>
      </div>
    );
  }
}

