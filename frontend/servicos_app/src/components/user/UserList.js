import React, { Component } from 'react'
import {
  Button, ButtonGroup, Container, Table, Spinner, Alert, Row,
  Col
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { listAllUsers, removeUser } from '../../api/API'

const initialState = {
  filterText: '',
  isLoading: true,
  errorMessage: '',
  users: []
}

export default class UserList extends Component {
  state = { ...initialState }

  async componentDidMount() {
    try {
      await this.listAllUsers()
    } catch (error) {
      console.log(error)
    }
  }

  listAllUsers = async () => {
    const { data } = await listAllUsers()
    this.setState({ users: data, isLoading: false })
  }

  remove = async (id) => {
    await removeUser(id).then(
      () => this.listAllUsers()
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
    const { isLoading, users, errorMessage } = this.state;

    const list = users
      .map(u => (
        <tr key={u.id}>
          <td>{u.nome}</td>
          <td>{u.login}</td>
          <td>{u.permissoes}</td>
          <td>
            <ButtonGroup>
              <Button size="sm" color="primary" tag={Link} to={"/users/" + u.id}>Editar</Button>
              <Button size="sm" color="danger" onClick={() => this.remove(u.id)}>Excluir</Button>
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
          <th width="20%">Login</th>
          <th width="20%">Permissões</th>
          <th width="10%">Ações</th>
        </tr>
      </thead>
      <tbody>
        {list}
      </tbody>
    </Table>
    return (
      <Container fluid>
        <h3>Usuários do sistema</h3>
        <Row>
          <Col>
            <div className="float-right" style={{ marginBottom: '15px' }}>
              <Button color="success" tag={Link} to="/users/new" >Adicionar Usuário</Button>
            </div>
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