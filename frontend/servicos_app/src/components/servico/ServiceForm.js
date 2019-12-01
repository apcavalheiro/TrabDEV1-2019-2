import React, { Component } from 'react';
import { updateService, createService, findService } from '../../api/API'
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button, Container, Row, Col, Alert } from 'reactstrap';

const intialState = {
  id: '',
  errorMessage: '',
  nome: '',
  descricaoServico: '',
  descricaoValor: '',
  valorBase: ''
}

export default class ServiceForm extends Component {
  constructor(props) {
    super(props)
    this.state = { ...intialState }
  }

  handleSubmit = async () => {
    const { descricaoValor, descricaoServico, nome, id, valorBase } = this.state
    if (!descricaoValor || !descricaoServico || !nome || !valorBase) return
    if (valorBase < 0) return
    const service = { descricaoValor, descricaoServico, nome, valorBase }

    try {
      if (id !== '') {
        await updateService(id, service)
      } else {
        await createService(service)
      }
      await this.props.history.push('/services')
    } catch (error) {
      let { message } = error.response.data
      this.setState({ errorMessage: message })
    }
  }

  async componentDidMount() {
    try {
      const { id } = this.props.match.params
      if (id) {
        const response = await findService(id)
        let { descricaoServico, descricaoValor, nome, valorBase } = response.data
        this.setState({
          id, descricaoServico, descricaoValor, nome, valorBase
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
    let { descricaoServico, descricaoValor, nome, valorBase, errorMessage, id } = this.state
    return (
      <Container>
        <Row>
          <Col>
            <div style={{ margin: "50px" }}>
              {errorMessage && <span><Alert color="danger" isOpen={this.state.visible}
                toggle={this.onDismiss}>{errorMessage}</Alert></span>}
            </div>
          </Col>
        </Row>
        <AvForm onSubmit={this.handleSubmit}>
          <AvField name="nome" label="Serviço" type="text" value={nome || ''}
            onChange={this.handleChange} validate={{
              required: { value: true, errorMessage: 'Campo obrigatório!' }
            }} />
          <AvField name="descricaoServico" label="Descrição do serviço:" type="textarea"
            value={descricaoServico || ''} onChange={this.handleChange} validate={{
              required: { value: true, errorMessage: 'Campo obrigatório!' }
            }} style={{ resize: "none" }} />
          <AvField name="descricaoValor" label="Descrição do valor:" type="textarea"
            value={descricaoValor || ''} onChange={this.handleChange} validate={{
              required: { value: true, errorMessage: 'Campo obrigatório!' }
            }} style={{ resize: "none" }} />
          <AvField name="valorBase" label="Valor Mínimo" type="number" value={valorBase || ''}
            onChange={this.handleChange} validate={{
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
