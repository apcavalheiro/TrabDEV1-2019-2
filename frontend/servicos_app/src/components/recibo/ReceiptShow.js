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
    const { idReceipt } = this.props.match.params
    if (idReceipt) {
      const response = await findReceipt(idReceipt)
      this.setState({
        receipt: response.data

      })
    }
  }

  render() {
    const { receipt, receipt: { cliente }, receipt: { servico } } = this.state
    const moeda = servico.valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
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
            <strong>Valor:</strong> {moeda || ''}<br />
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