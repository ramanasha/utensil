import React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { hot } from 'react-hot-loader'; // eslint-disable-line import/no-extraneous-dependencies

import Layout from './ui/Layout';

const App = ({ history }) => (
  <ConnectedRouter history={history}>
    <Layout />
  </ConnectedRouter>
);

export default hot(module)(App);
