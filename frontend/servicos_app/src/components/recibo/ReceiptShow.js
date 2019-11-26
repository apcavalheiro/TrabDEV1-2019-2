import React, { Component } from 'react'
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import { findReceipt } from '../../api/API'

export default class ReceiptShow extends Component {
  state = {
    receipt: {
      data: '',
      valor: '',
      cliente: {
        nome: '',
        email: '',
        endereco: ''
      },
      servico: {
        descricaoValor: '',
        descricaoServico: ''
      }
    }
  }

  async componentDidMount() {
    try {
      const { idReceipt } = this.props.match.params
      if (idReceipt) {
        const response = await findReceipt(idReceipt)
        this.setState({
          receipt: response.data

        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const { receipt, receipt: { cliente }, receipt: { servico } } = this.state
    const moeda = receipt.valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
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
            <strong>Descrição do serviço:</strong> {servico.descricaoServico || ''}<br />
            <strong>Descrição do valor:</strong> {servico.descricaoValor || ''}<br />
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
        <ListGroupItem>
          <ListGroupItemHeading>Valor cobrado pelo serviço:</ListGroupItemHeading>
          <ListGroupItemText>
            <strong>Valor:</strong> {moeda || ''}<br />
          </ListGroupItemText>
        </ListGroupItem>
      </ListGroup>
    );
  }
}