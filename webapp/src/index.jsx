import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';

import configureStore from './configureStore';
import App from './App';

const history = createHistory();
const store = configureStore(history);
const container = document.getElementById('container');

render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  container,
);
