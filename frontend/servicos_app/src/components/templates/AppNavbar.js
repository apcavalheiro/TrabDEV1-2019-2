import React, { Component } from 'react'
import { IoIosContact } from "react-icons/io";

import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import { logout, isLoggedIn } from '../login/AuthStorage'

export default class AppNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false, log: true };
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  logout = async () => {
    await logout()
    await document.location.reload(true);
  }

  render() {
    const nome = localStorage.getItem('@nomeUsuario')
    return (<Navbar style={{ background: 'black', fontSize: "18px" }} dark expand="md">
      <NavbarBrand tag={Link} to="/home">DEV1 2019/2</NavbarBrand>
      <NavbarToggler onClick={this.toggle} />
      <Collapse isOpen={this.state.isOpen} navbar>
        {isLoggedIn() && <Nav className="ml-auto" navbar>
          <NavbarBrand className="float-left" style={{ color: "#ffff00",padding:"6px" }}>
            <IoIosContact />&nbsp;
            {nome || ""}
          </NavbarBrand>
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
            {<NavLink style={{ color: "#ffff00" }} tag={Link} to="/" onClick={this.logout}><Button outline color="warning">Sair</Button></NavLink>}
          </NavItem>
        </Nav>}

      </Collapse>
    </Navbar >)
  }
}