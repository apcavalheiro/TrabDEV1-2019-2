import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import ClientForm from '../components/client/ClientForm'
import ClientList from '../components/client/ClientList'
import Home from '../components/home/Home'
import { isLoggedIn } from '../components/login/AuthStorage'
import LoginForm from '../components/login/LoginForm'
import ReceiptForm from '../components/recibo/ReceiptForm'
import ReceiptList from '../components/recibo/ReceiptList'
import ReceiptShow from '../components/recibo/ReceiptShow'
import ServiceForm from '../components/servico/ServiceForm'
import ServiceList from '../components/servico/ServiceList'
import AppNavbar from '../components/templates/AppNavbar'
import UserForm from '../components/user/UserForm'
import UserList from '../components/user/UserList'


const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isLoggedIn() ? (<Component {...props} />)
                : (<Redirect to={{ pathname: "/", state: { from: props.location } }} />)} />)

const Routes = () => (
    <Router>
        <AppNavbar />
        <Switch>
            <Route path='/' exact={true} component={LoginForm} />
            <PrivateRoute path='/home' exact={true} component={Home} />
            <PrivateRoute path='/services' exact={true} component={ServiceList} />
            <PrivateRoute path='/services/new' component={ServiceForm} />
            <PrivateRoute path='/services/:id' component={ServiceForm} />
            <PrivateRoute path='/clients' exact={true} component={ClientList} />
            <PrivateRoute path='/clients/new' component={ClientForm} />
            <PrivateRoute path='/clients/:id' component={ClientForm} />
            <PrivateRoute path='/receipts' exact={true} component={ReceiptList} />
            <PrivateRoute path='/receipts/new' component={ReceiptForm} />
            <PrivateRoute path='/receipts/show/:idReceipt' component={ReceiptShow} />
            <PrivateRoute path='/receipts/:idReceipt' component={ReceiptForm} />
            <Route path='/users/new' component={UserForm} />
            <Route path='/users/:id' component={UserForm} />
            <Route path='/users' exact={true} component={UserList} />
            <Route path="*" component={() => <h1>Page not found!</h1>} />
        </Switch>
    </Router>
)
export default Routes;