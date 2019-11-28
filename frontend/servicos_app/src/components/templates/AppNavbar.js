import React, { Component } from 'react'
import {
  Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem,
  NavLink,
} from 'reactstrap'
import { Link } from 'react-router-dom'
import { isLoggedIn } from '../login/AuthStorage'
import UserComponent from '../user/UserComponent';


export default class AppNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpenNav: false };
  }

  toggleNav = () => {
    this.setState({
      Nav: !this.state.Nav
    });
  }

  render() {

    return (<Navbar style={{ background: 'black', fontSize: "18px" }} dark expand="md">
      <NavbarBrand tag={Link} to="/home">DEV1 2019/2</NavbarBrand>
      <NavbarToggler onClick={this.Nav} />
      {isLoggedIn() && <Collapse Nav={this.state.Nav} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink tag={Link} to="/home">Início</NavLink>
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
          <NavItem>
            <UserComponent />
          </NavItem>
        </Nav>
      </Collapse>}
    </Navbar >)
  }
}