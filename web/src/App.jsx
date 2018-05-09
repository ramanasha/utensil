import React from 'react';
import PropTypes from 'prop-types';
import { ConnectedRouter } from 'react-router-redux';
import { hot } from 'react-hot-loader'; // eslint-disable-line import/no-extraneous-dependencies

import Layout from './ui/Layout';

const App = ({ history }) => (
  <ConnectedRouter history={history}>
    <Layout />
  </ConnectedRouter>
);

App.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default hot(module)(App);
