import React, { Component } from 'react'
import {
  Button, ButtonGroup, Container, Table, Spinner,
  Alert, Row, Col, FormGroup, Input, Card, CardTitle, CardText
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { listAllReceipts, removeReceipt } from '../../api/API'

const initialState = {
  filterData: '',
  filterNome: '',
  isLoading: true,
  errorMessage: '',
  receipts: []
}

export default class ClientList extends Component {
  state = { ...initialState }

  async componentDidMount() {
    await this.listAllreceipts()
  }

  listAllreceipts = async () => {
    const { data } = await listAllReceipts()
    this.setState({ receipts: data, isLoading: false })
  }

  remove = async (id) => {
    await removeReceipt(id).then(
      () => this.listAllreceipts()
    ).catch(
      error => {
        let { message } = error.response.data
        this.setState({ errorMessage: message })
      }
    )
  }

  handleChange = ({ target }) => {
    const value = target.value
    const name = target.name
    this.setState({ [name]: value })
  }

  onDismiss = () => {
    document.location.reload(true);
    this.setState({ visible: false, errorMessage: '' })
  }

  render() {
    const { isLoading, receipts, errorMessage, filterData, filterNome } = this.state;

    const list = receipts
      .filter(r => {
        return r.data.toLowerCase().indexOf(filterData.toLowerCase()) >= 0
      })
      .filter(r => {
        return r.cliente.nome.toLowerCase().indexOf(filterNome.toLowerCase()) >= 0
      })
      .map(r => (
        <tr key={r.id}>
          <td>{r.data}</td>
          <td>{r.cliente.nome}</td>
          <td>{r.servico.nome}</td>
          <td>{r.valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>
          <td>
            <ButtonGroup>
              <Button size="sm" color="primary" tag={Link} to={"/receipts/" + r.id}>Editar</Button>
              <Button size="sm" color="danger" onClick={() => this.remove(r.id)}>Excluir</Button>
              <Button size="sm" color="info" tag={Link} to={"/receipts/show/" + r.id}>Detalhe</Button>
            </ButtonGroup>
          </td>
        </tr>
      ))

    const loading = <div >
      <Spinner size="sm" color="primary" />{' '}
      <Spinner size="sm" color="secondary" />{' '}
      Loading...</div>

    const table = <Table className="mt-4">
      <thead>
        <tr>
          <th width="20%">Data</th>
          <th width="20%">Cliente</th>
          <th width="20%">Serviço</th>
          <th width="20%">Valor</th>
          <th width="10%">Ações</th>
        </tr>
      </thead>
      <tbody>
        {list}
      </tbody>
    </Table>

    return (
      <Container fluid>
        <h3>Recibos</h3>
        <Row>
          <Col>
            <div className="float-right"style={{ marginBottom: '15px' }}>
              <Button color="success"  tag={Link} to="/receipts/new" >Gerar Recibo</Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card body>
              <CardTitle><h5>Buscar recibos por:</h5></CardTitle>
              <CardText><h6>Data:</h6></CardText>
              <FormGroup>
                <Input type="text" name="filterData" id="filterData" onChange={this.handleChange}
                  placeholder="DD/MM/AAAA" />
              </FormGroup>
              <CardText><h6>Nome do Cliente:</h6></CardText>
              <FormGroup>
                <Input type="text" name="filterNome" id="filterNome" onChange={this.handleChange}
                  placeholder="Nome..." />
              </FormGroup>
            </Card>

          </Col>
        </Row>
        <Row>
          <Col>
            <div style={{ margin: "50px" }}>
              {errorMessage && <span><Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>{errorMessage}</Alert></span>}
            </div>
          </Col>
        </Row>
        {isLoading ? loading : table}
      </Container>
    )
  }
} 