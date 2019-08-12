import React, { Component } from 'react'
import { Button, ButtonGroup, Container, Table, Spinner, Alert, Row, Col, FormGroup, Input, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { listAllClients, removeClient } from '../../api/API'

const initialState = {
  filterText: '',
  isLoading: true,
  errorMessage: '',
  clients: []
}

export default class ClientList extends Component {
  state = { ...initialState }

  async componentDidMount() {
    await this.listAllClients()
  }

  listAllClients = async () => {
    const { data } = await listAllClients()
    this.setState({ clients: data, isLoading: false })
  }

  remove = async (id) => {
    await removeClient(id).then(
      () => this.listAllClients()
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
    const { isLoading, clients, errorMessage, filterText } = this.state;

    const list = clients
      .filter(c => {
        return c.nome.toLowerCase().indexOf(filterText.toLowerCase()) >= 0
      })
      .map(c => (
        <tr key={c.id}>
          <td>{c.nome}</td>
          <td>{c.email}</td>
          <td>{c.endereco}</td>
          <td>
            <ButtonGroup>
              <Button size="sm" color="primary" tag={Link} to={"/clients/" + c.id}>Editar</Button>
              <Button size="sm" color="danger" onClick={() => this.remove(c.id)}>Excluir</Button>
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
          <th width="20%">Nome</th>
          <th width="20%">Email</th>
          <th width="20%">Endereço</th>
          <th width="10%">Ações</th>
        </tr>
      </thead>
      <tbody>
        {list}
      </tbody>
    </Table>

    return (
      <Container fluid>
        <h3>Clientes</h3>
        <Row>
          <Col>
            <div className="float-right">
              <Button color="success" tag={Link} to="/clients/new" >Adicionar Cliente</Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label for="nome">Buscar Cliente </Label>
              <Input type="text" name="filterText" id="filterText" onChange={this.handleChange} placeholder="Buscar por nome..." />
            </FormGroup>
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