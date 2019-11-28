import React, { Component } from 'react'
import { Col, Form, FormGroup, Input, Button, Card, CardTitle, Row, Alert } from 'reactstrap'
import { accessed } from '../../api/API'
import { setAuthToken } from './AuthStorage'

const intialState = {
    login: '', senha: '', errorMessage: ''
}

export default class LoginForm extends Component {
    constructor(props) {
        super(props)
        this.state = { ...intialState }
    }

    handleChange = ({ target }) => {
        const value = target.value
        const name = target.name
        this.setState({ [name]: value })
    }

    handleSubmit = async () => {
        const { login, senha } = this.state
        if (!login || !senha) {
            this.setState({ errorMessage: "Os campos precisam ser preenchidos!" })
            return
        }

        const pass = {
            login,
            senha
        }
        try {
            const retorno = await accessed(pass)
            await setAuthToken(retorno.headers.token)
            await localStorage.setItem('@nomeUsuario', retorno.data.nome)
            await localStorage.setItem('@perfilUsuario', retorno.data.permissoes)
            await this.props.history.push("/home")
            await document.location.reload(true)

        } catch (error) {
            let { message } = error.response.data
            this.setState({ errorMessage: message })
        }
    }
    onDismiss = () => {
        document.location.reload(true);
        this.setState({ visible: false, errorMessage: '' })
    }

    render() {
        const { errorMessage } = this.state
        return (
            <Col align="center">
                <Row>
                    <Col>
                        <div style={{ margin: "50px" }}>
                            {errorMessage && <span><Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>{errorMessage}</Alert></span>}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h1>Sistema para cadastro de serviços</h1>
                    </Col>
                </Row>
                <Card body style={{ borderColor: '#333', width: '400px', height: '250px' }} >
                    <CardTitle color="success"> Realize o logon para acesso!</CardTitle>
                    <Form>
                        <FormGroup>
                            <Input type="text" name="login" placeholder="Login: " onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Input type="password" name="senha" placeholder="Senha: " onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup>
                        </FormGroup>
                    </Form>
                    <Button color="primary" onClick={this.handleSubmit}>Login</Button>
                </Card>
            </ Col >
        )
    }
}
