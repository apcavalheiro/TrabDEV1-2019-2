import React, { Component } from 'react'
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import { findReceipt } from '../../api/API'

export default class ReceiptShow extends Component {
  state = {
    receipt: {
      data: '',
      cliente: {
        nome: '',
        email: '',
        endereco: ''
      },
      servico: {
        descricao: '',
        valor: ''
      }
    }
  }

  async componentDidMount() {
    const { id } = this.props.match.params
    if (id) {
      const response = await findReceipt(id)
      this.setState({
        receipt: response.data

      })
    }
  }

  render() {
    const { receipt, receipt: { cliente }, receipt: { servico } } = this.state
    return (
      <ListGroup>
        <ListGroupItem active>
          <ListGroupItemHeading>Recibo número: {receipt.id}</ListGroupItemHeading>
        </ListGroupItem>
        <ListGroupItem>
          <ListGroupItemHeading>Data do serviço:</ListGroupItemHeading>
          <ListGroupItemText>
            {receipt.data}
          </ListGroupItemText>
        </ListGroupItem>
        <ListGroupItem>
          <ListGroupItemHeading>Dados do Serviço:</ListGroupItemHeading>
          <ListGroupItemText>
            <strong>Descrição:</strong> {servico.descricao || ''}<br />
            <strong>Valor R$:</strong> {servico.valor || ''}<br />
          </ListGroupItemText>
        </ListGroupItem>
        <ListGroupItem>
          <ListGroupItemHeading>Dados do cliente:</ListGroupItemHeading>
          <ListGroupItemText>
            <strong>Nome:</strong> {cliente.nome || ''}<br />
            <strong>E-Mail:</strong> {cliente.email || ''}<br />
            <strong>Endereço:</strong> {cliente.endereco || ''}
          </ListGroupItemText>
        </ListGroupItem>
      </ListGroup>
    );
  }
}