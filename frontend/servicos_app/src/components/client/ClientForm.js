import React, { Component } from 'react';
import { findClient, updateClient, createClient } from '../../api/API'
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button, Container, Row, Col, Alert } from 'reactstrap';

const intialState = {
  id: '',
  errorMessage: '',
  nome: '',
  email: '',
  endereco: ''
}

export default class ClientForm extends Component {
  constructor(props) {
    super(props)
    this.state = { ...intialState }
  }

  handleSubmit = async () => {
    const { email, nome, endereco, id } = this.state
    const client = { email, nome, endereco }
    if (!email || !nome || !endereco) return
    if (!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) return
    try {
      if (id != '') {
        await updateClient(id, client)
      } else {
        await createClient(client)
      }
      await this.props.history.push('/clients')
    } catch (error) {
      let { message } = error.response.data
      this.setState({ errorMessage: message })
    }
  }

  async componentDidMount() {
    try {
      const { id } = this.props.match.params
      if (id) {
        const response = await findClient(id)
        let { nome, email, endereco } = response.data
        this.setState({
          id, nome, email, endereco
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
    let { nome, email, endereco, errorMessage, id } = this.state
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
          <AvField name="email" label="Email" type="email" value={email || ''} onChange={this.handleChange} errorMessage="Entre com um email válido" validate={{
            required: { value: true, errorMessage: 'Campo obrigatório!' }
          }} />
          <AvField name="endereco" label="Endereço" type="text" value={endereco || ''} onChange={this.handleChange} validate={{
            required: { value: true, errorMessage: 'Campo obrigatório!' }
          }} />
          <div className="float-right">
            <Button type="button" onClick={this.handleClear} color="info" >Cancelar</Button>
            {' '}
            <Button color="success">{id ? "Atualizar" : "Cadastrar"}</Button>
          </div>
        </AvForm>
      </Container>
    )
  }
}
