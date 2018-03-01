import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader'; // eslint-disable-line import/no-extraneous-dependencies

import Dashboard from './Dashboard';
import Login from './Login';
import CreateAccount from './CreateAccount';
import SplitwiseAuth from './SplitwiseAuth';
import Menu from './Menu';
import Order from './Order';
import Suggest from './Suggest';
import Vote from './Vote';
import GroupDetails from './GroupDetails';
import OrderDetails from './OrderDetails';

const Routes = () => (
  <Switch>
    <Route exact path='/' component={Dashboard} />
    <Route exact path='/login' component={Login} />
    <Route path='/login/create' component={CreateAccount} />
    <Route path='/login/splitwise-auth' component={SplitwiseAuth} />
    <Route path='/menu/:id' component={Menu} />
    <Route path='/join/:id' component={Order} />
    <Route path='/start/:id' component={Order} />
    <Route path='/activate/:id' component={Order} />
    <Route path='/suggest/:id' component={Suggest} />
    <Route path='/vote/:id' component={Vote} />
    <Route path='/group-details/:id' component={GroupDetails} />
    <Route path='/order-details/:id' component={OrderDetails} />
  </Switch>
);

export default hot(module)(Routes);
