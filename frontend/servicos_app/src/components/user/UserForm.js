import React, { Component } from 'react';
import { listUser, updateUser, createUser } from '../../api/API'
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button, Container, Row, Col, Alert } from 'reactstrap';

const intialState = {
  id: '',
  errorMessage: '',
  nome: '',
  login: '',
  pass: '',
  permissao: ''
}

export default class ClientForm extends Component {
  constructor(props) {
    super(props)
    this.state = { ...intialState }
  }

  handleSubmit = async () => {
    const { login, nome, permissao, id, pass } = this.state
    const permissoes = [permissao]
    const usuario = { login, nome, permissoes, pass }
    if (!login || !nome || !permissoes || !pass) return
    try {
      if (id != '') {
        await updateUser(id, usuario)
      } else {
        await createUser(usuario)
      }
      await this.props.history.push('/users')
    } catch (error) {
      let { message } = error.response.data
      this.setState({ errorMessage: message })
    }
  }

  async componentDidMount() {
    try {
      const { id } = this.props.match.params
      if (id) {
        const response = await listUser(id)
        let { nome, login, permissao } = response.data
        this.setState({
          id, nome, login, permissao
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  handleChange = ({ target }) => {
    const value = target.value
    const name = target.name
    this.setState({ [name]: value })
  }

  handleClear = () => (
    this.setState({
      ...intialState
    })
  )

  onDismiss = () => {
    document.location.reload(true);
    this.setState({ visible: false, errorMessage: '' })
  }

  render() {
    let { nome, login, permissao, errorMessage, pass, id } = this.state
    return (
      <Container>
        <Row>
          <Col>
            <div style={{ margin: "50px" }}>
              {errorMessage && <span><Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>{errorMessage}</Alert></span>}
            </div>
          </Col>
        </Row>
        <AvForm onSubmit={this.handleSubmit}>
          <AvField name="nome" label="Nome" type="text" value={nome || ''} onChange={this.handleChange} validate={{
            required: { value: true, errorMessage: 'Campo obrigatório!' }
          }} />
          <AvField name="login" label="Login" type="text" value={login || ''} onChange={this.handleChange} errorMessage="Entre com um login válido" validate={{
            required: { value: true, errorMessage: 'Campo obrigatório!' }
          }} />
          <AvField name="pass" label={id ? <span style={{ color: "red" }}>Digite uma nova senha
          se desejar alterar</span> : "Senha"} type="password" value="" onChange={this.handleChange} validate={{
              required: { value: true, errorMessage: 'Campo obrigatório!' }
            }} />
          <AvField type="select" name="permissao" label="Selecione a permissão:"
            errorMessage="Campo Obrigátorio!"
            value={permissao || ''} onChange={this.handleChange} required>
            <option value=""></option>
            <option value="usuario">Usuário do Sistema</option>
            <option value="administrador">Administrador do Sistema</option>
            ))}
          </AvField>
          <div className="float-right">
            <Button type="button" onClick={this.handleClear} color="info" >Cancelar</Button>
            {' '}
            <Button color="success">Cadastrar</Button>
          </div>
        </AvForm>
      </Container>
    )
  }
}
