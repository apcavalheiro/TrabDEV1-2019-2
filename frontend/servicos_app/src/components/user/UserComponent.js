import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { IoIosContact } from "react-icons/io";
import { UncontrolledCollapse, CardBody, Card, Button, NavLink, NavItem } from 'reactstrap'
import { logout } from '../login/AuthStorage'


export default class UserComponent extends Component {

    logout = async () => {
        await logout()
    }

    render() {
        const nome = localStorage.getItem('@nomeUsuario')
        const perfil = localStorage.getItem('@permissaoUsuario')

        const toggler = <div>
            <Button color="warning" id="toggler" style={{ marginBottom: '1rem' }}>
                <IoIosContact />&nbsp;
                {nome || ""}
            </Button>
            < UncontrolledCollapse toggler="#toggler" >
                <Card>
                    <CardBody style={{ color: "#ffff00", background: "#333" }}>
                        {perfil || ""}
                        <NavItem>
                            <NavLink tag={Link} to="/users">Gerenciar usuários</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to="/receipts">Alterar senha</NavLink>
                        </NavItem>
                        <NavItem>
                            <a href="/" style={{ color: "#ffff00", background: "#333", textDecoration: "none" }} onClick={this.logout}>Sair</a>
                        </NavItem>
                    </CardBody>
                </Card>
            </UncontrolledCollapse >
        </div >

        return toggler
    }
}