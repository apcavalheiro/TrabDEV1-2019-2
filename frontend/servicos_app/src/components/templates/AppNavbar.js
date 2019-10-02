import React, { Component } from 'react'
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap'
import { Link } from 'react-router-dom'

export default class AppNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (<Navbar style={{ background: 'black' }} dark expand="md">
      <NavbarBrand tag={Link} to="/">DEV1 2019/2</NavbarBrand>
      <NavbarToggler onClick={this.toggle} />
      <Collapse isOpen={this.state.isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink tag={Link} to="/">Início</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/services">Serviços</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/clients">Clientes</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/receipts">Recibos</NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>)
  }
}