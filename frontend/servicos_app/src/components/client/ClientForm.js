import React, { Component } from 'react';
import { findClient, updateClient, createClient } from '../../api/API'
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button, Container } from 'reactstrap';

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
    if (!(email || nome || endereco)) return
    if (!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) return
    if (id !== '') {
      await updateClient(id, client)
    } else {
      await createClient(client)
    }
    await this.props.history.push('/clients')
  }

  async componentDidMount() {
    const { id } = this.props.match.params
    if (id) {
      const response = await findClient(id)
      let { nome, email, endereco } = response.data
      this.setState({
        id, nome, email, endereco
      })
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

  render() {
    let { nome, email, endereco } = this.state
    return (
      <Container>
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
            <Button color="success">Cadastrar</Button>
          </div>
        </AvForm>
      </Container>
    )
  }
}