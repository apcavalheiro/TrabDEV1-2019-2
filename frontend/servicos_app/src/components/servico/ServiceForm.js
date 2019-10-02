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
}

export default class ServiceForm extends Component {
  constructor(props) {
    super(props)
    this.state = { ...intialState }
  }

  handleSubmit = async () => {
    const { descricaoValor, descricaoServico, nome, id } = this.state
    const service = { descricaoValor, descricaoServico, nome }
    if (!descricaoValor || !descricaoServico || !nome) return
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
    const { id } = this.props.match.params
    if (id) {
      const response = await findService(id)
      console.log(response.data)
      let { descricaoServico, descricaoValor, nome } = response.data
      this.setState({
        id, descricaoServico, descricaoValor, nome
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

  onDismiss = () => {
    document.location.reload(true);
    this.setState({ visible: false, errorMessage: '' })
  }

  render() {
    let { descricaoServico, descricaoValor, nome, errorMessage } = this.state
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
          <AvField name="nome" label="Nome" type="text" value={nome || ''}
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
