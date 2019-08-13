import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import AppNavbar from '../components/templates/AppNavbar'
import Home from '../components/home/Home'
import ClientForm from '../components/client/ClientForm'
import ClientList from '../components/client/ClientList'
import ReceiptList from '../components/recibo/ReceiptList'
import ReceiptForm from '../components/recibo/ReceiptForm'
import ReceiptShow from '../components/recibo/ReceiptShow'

const Routes = () => (
    <Router>
        <AppNavbar />
        <Switch>
            <Route path='/' exact={true} component={Home} />
            <Route path='/clients' exact={true} component={ClientList} />
            <Route path='/clients/new' component={ClientForm} />
            <Route path='/clients/:id' component={ClientForm} />
            <Route path='/receipts' exact={true} component={ReceiptList} />
            <Route path='/receipts/show/:idReceipt' component={ReceiptShow} />
            <Route path='/receipts/:idReceipt' component={ReceiptForm} />
            <Route path='/receipts/new' component={ReceiptForm} />
        </Switch>
    </Router>
)

export default Routes;