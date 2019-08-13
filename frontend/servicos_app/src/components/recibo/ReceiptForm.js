import React, { Component } from 'react';
import { findReceipt, updateReceipt, createReceipt, listAllClients } from '../../api/API'
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button, Container, Input, FormGroup, Label, Row, Col, Alert } from 'reactstrap';

const intialState = {
  errorMessage: '',
  idClient: '',
  idReceipt: '',
  data: '',
  descricao: '',
  valor: '',
  clients: [],
}

export default class ReceiptForm extends Component {
  constructor(props) {
    super(props)
    this.state = { ...intialState }
  }
  
  handleSubmit = async () => {
    const { descricao, valor, data, idClient, idReceipt, clients } = this.state
    const cliente = clients && clients.find(c => c.id == idClient)
    const servico = { descricao, valor }
    const recibo = {
      data: data.split("-").reverse().join("/"),
      servico,
      cliente
    }
    
    if (!(descricao || valor || valor > 0 || data)) return
    try {
      if (idReceipt !== '') {
        await updateReceipt(idReceipt, recibo)
      } else {
        await createReceipt(recibo)
      }
      this.props.history.push('/receipts')
    } catch (error) {
      let { message } = error.response.data
      this.setState({ errorMessage: message })
    }
  }
  
  async componentDidMount() {
    const responseClient = await listAllClients()
    this.setState({
      clients: responseClient.data
    })
    const { idReceipt } = this.props.match.params
    if (idReceipt) {
      const response = await findReceipt(idReceipt)
      let { data, servico: { descricao, valor }, cliente: { id } } = response.data
      this.setState({
        data, descricao, valor, idReceipt, idClient: id
      })
    }
  }
  
  handleChange = ({ target }) => {
    const value = target.value
    const name = target.name
    this.setState({ [name]: value })
  }
  
  handleClear = () => {
    this.setState({
      ...intialState
    })
    this.props.history.push('/receipts/new')
  }
  
  onDismiss = () => {
    document.location.reload(true);
    this.setState({ visible: false, errorMessage: '' })
  }
  
  render() {
    let { data, descricao, valor, idClient, clients, errorMessage, idReceipt } = this.state
    console.log()
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
          <AvField name="data" label="Data:" type="text" errorMessage="Obrgátorio" value={data || ''} onChange={this.handleChange} validate={{
            required: { value: true, errorMessage: 'Campo obrigatório!' },
            pattern: { value: "(([1-2][0-9])|([1-9])|(3[0-1]))/((1[0-2])|([1-9]))/[0-9]{4}", errorMessage: 'Formato dd/mm/aaaa' }
          }}
          />
          <AvField name="descricao" label="Descrição:" type="textarea" value={descricao || ''} onChange={this.handleChange} validate={{
            required: { value: true, errorMessage: 'Campo obrigatório!' }
          }} style={{ resize: "none" }} />
          <AvField name="valor" label="Valor:" type="number" value={valor || ''} onChange={this.handleChange} validate={{
            required: { value: true, errorMessage: 'Campo obrigatório!' },
            pattern: { value: '[0-9]+$', errorMessage: 'Apenas valores númericos maiores que zero!' }
          }} />
          <FormGroup>
            <Label for="clientes">Selecione o cliente:</Label>
            <Input type="select" name="idClient" value={idClient || ''} onChange={this.handleChange}>
              <option value=""></option>
              {clients && clients.map(c => (
                <option value={c.id} key={c.id}>{c.nome}</option>
              ))}
            </Input>
          </FormGroup>
          <div className="float-right">
            <Button type="button" onClick={this.handleClear} color="info" >Cancelar</Button>
            {' '}
            <Button color="success">{idReceipt ? "Atualizar" : "Cadastrar"}</Button>
          </div>
        </AvForm>
      </Container>
    )
  }
}
