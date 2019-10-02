import React, { Component } from 'react'
import {
  Button, ButtonGroup, Container, Table, Spinner, Alert, Row,
  Col, FormGroup, Input, Card, CardTitle
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { listAllServices, removeService } from '../../api/API'

const initialState = {
  filterText: '',
  isLoading: true,
  errorMessage: '',
  services: []
}

export default class ServiceList extends Component {
  state = { ...initialState }

  async componentDidMount() {
    await this.listAllServices()
  }

  listAllServices = async () => {
    const { data } = await listAllServices()
    this.setState({ services: data, isLoading: false })
  }

  remove = async (id) => {
    await removeService(id).then(
      () => this.listAllServices()
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
    const { isLoading, services, errorMessage, filterText } = this.state;

    const list = services
      .filter(s => {
        return s.nome.toLowerCase().indexOf(filterText.toLowerCase()) >= 0
      })
      .map(s => (
        <tr key={s.id}>
          <td>{s.nome}</td>
          <td>{s.descricaoServico}</td>
          <td>{s.descricaoValor}</td>
          <td>
            <ButtonGroup>
              <Button size="sm" color="primary" tag={Link} to={"/services/" + s.id}>Editar</Button>
              <Button size="sm" color="danger" onClick={() => this.remove(s.id)}>Excluir</Button>
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
          <th width="20%">Descrição Serviço</th>
          <th width="20%">Descrição Valor</th>
          <th width="10%">Ações</th>
        </tr>
      </thead>
      <tbody>
        {list}
      </tbody>
    </Table>

    return (
      <Container fluid>
        <h3>Serviços</h3>
        <Row>
          <Col>
            <div className="float-right" style={{ marginBottom: '15px' }}>
              <Button color="success" tag={Link} to="/services/new" >Adicionar Serviço</Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card body>
              <CardTitle><h5>Buscar serviços:</h5></CardTitle>
              <FormGroup>
                <Input type="text" name="filterText" id="filterText" onChange={this.handleChange}
                  placeholder="Serviço..." />
              </FormGroup>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <div style={{ margin: "50px" }}>
              {errorMessage && <span><Alert color="danger" isOpen={this.state.visible}
                toggle={this.onDismiss}>{errorMessage}</Alert></span>}
            </div>
          </Col>
        </Row>
        {isLoading ? loading : table}
      </Container>
    )
  }
}