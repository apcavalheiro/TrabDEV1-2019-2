import React, { Component } from 'react';
import {
  findReceipt, updateReceipt, createReceipt,
  listAllClients, listAllServices
} from '../../api/API'
import { AvForm, AvField } from 'availity-reactstrap-validation';
import {
  Button, Container, Row, Col, Alert
} from 'reactstrap';

const intialState = {
  errorMessage: '',
  idClient: '',
  idReceipt: '',
  data: '',
  valor: '',
  idService: '',
  services: [],
  clients: [],
}

export default class ReceiptForm extends Component {
  constructor(props) {
    super(props)
    this.state = { ...intialState }
  }
  ""
  handleSubmit = async () => {
    const { idService, services, data, valor, idClient, idReceipt, clients } = this.state
    if (!data || !idClient || !idService || !valor || valor <= 0) return
    let cliente = clients && clients.find(c => c.id == idClient)
    let servico = services && services.find(s => s.id == idService)
    let recibo = {
      data: data.split("-").reverse().join("/"),
      valor,
      servico,
      cliente
    }
    try {
      if (idReceipt !== '') {
        console.log("update" + idReceipt)
        await updateReceipt(idReceipt, recibo)
      } else {
        console.log("create veio no post" + recibo)

        await createReceipt(recibo)
      }
      await this.props.history.push('/receipts')
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

    const responseService = await listAllServices()
    this.setState({
      services: responseService.data
    })

    const { idReceipt } = this.props.match.params
    if (idReceipt) {
      const response = await findReceipt(idReceipt)
      const { data, valor, servico, cliente } = response.data
      const idService = servico.id
      const idClient = cliente.id
      this.setState({
        data, valor, idService, idReceipt, idClient
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
  }

  onDismiss = () => {
    document.location.reload(true);
    this.setState({ visible: false, errorMessage: '' })
  }

  render() {
    let { data, valor, services, idService,
      idClient, clients, errorMessage, idReceipt } = this.state
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
          <AvField name="data" label="Data:" type="text" errorMessage="Obrigátorio"
            value={data || ''} onChange={this.handleChange} validate={{
              required: { value: true, errorMessage: 'Campo obrigatório!' },
              pattern: {
                value: "(([1-2][0-9])|([1-9])|(3[0-1]))/((1[0-2])|([1-9]))/[0-9]{4}",
                errorMessage: 'Formato dd/mm/aaaa'
              }
            }}
          />

          <AvField type="select" name="idService" label="Selecione o serviço:"
            errorMessage="Obrigátorio"
            value={idService || ''} onChange={this.handleChange} required>
            <option value=""></option>
            {services && services.map(s => (
              <option value={s.id} key={s.id}>{s.nome}</option>
            ))}
          </AvField>

          <AvField type="select" name="idClient" label="Selecione o cliente:"
            errorMessage="Obrigátorio"
            value={idClient || ''} onChange={this.handleChange} required>
            <option value=""></option>
            {clients && clients.map(c => (
              <option value={c.id} key={c.id}>{c.nome}</option>
            ))}
          </AvField>

          <AvField name="valor" label="Valor:" type="number" value={valor || ''}
            onChange={this.handleChange} validate={{
              required: { value: true, errorMessage: 'Campo obrigatório!' },
              pattern: { value: '[0-9]+$', errorMessage: 'Apenas valores númericos maiores que zero!' }
            }} />

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
