import React from 'react';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button } from 'reactstrap';

const initialState = {
  email: '',
  emailValid: ''
}

export default class Strap extends React.Component {
  state = { ...initialState }

  handleChange = ({ target }) => {
    const value = target.value
    const name = target.name
    this.setState({ [name]: value })
  }

  handleSubmit = () => {
    const { email } = this.state
    if (!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) return
    if (!email) return
    alert(email)
  }

  render() {
    console.log(this.state.errorMessage)
    return (
      <AvForm onSubmit={this.handleSubmit}>

        {/* <AvField name="name" label="Name (default error message)" type="text" validate={{
          required: { value: true },
          pattern: { value: '^[A-Za-z0-9]+$' },
          minLength: { value: 6 },
          maxLength: { value: 16 }
        }} />*/}
        <AvField name="email" label="Email" type="email" onChange={this.handleChange} errorMessage="Entre com um email válido" validate={{
          required: { value: true, errorMessage: 'Campo obrigatório!' },
          //minLength: { value: 6, errorMessage: 'Your name must be between 6 and 16 characters' },
          // maxLength: { value: 16, errorMessage: 'Your name must be between 6 and 16 characters' }
        }} />
        {/* <AvField name="nameCustomMessage" label="Name (custom error message)" type="text" validate={{
          required: { value: true, errorMessage: 'Please enter a name' },
          pattern: { value: '^[A-Za-z0-9]+$', errorMessage: 'Your name must be composed only with letter and numbers' },
          minLength: { value: 6, errorMessage: 'Your name must be between 6 and 16 characters' },
          maxLength: { value: 16, errorMessage: 'Your name must be between 6 and 16 characters' }
        }} />*/}
        <Button color="primary">Submit</Button>
      </AvForm>
    );
  }
}