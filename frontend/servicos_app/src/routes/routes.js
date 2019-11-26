import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import AppNavbar from '../components/templates/AppNavbar'
import Home from '../components/home/Home'
import ServiceForm from '../components/servico/ServiceForm'
import ServiceList from '../components/servico/ServiceList'
import ClientForm from '../components/client/ClientForm'
import ClientList from '../components/client/ClientList'
import ReceiptList from '../components/recibo/ReceiptList'
import ReceiptForm from '../components/recibo/ReceiptForm'
import ReceiptShow from '../components/recibo/ReceiptShow'
import LoginForm from '../components/login/LoginForm'
import { isLoggedIn } from '../components/login/AuthStorage'

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
            <Route path="*" component={() => <h1>Page not found!</h1>} />
        </Switch>
    </Router>
)
export default Routes;