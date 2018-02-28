import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from 'data/rootReducer';

export default history => {
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(
      thunkMiddleware,
      routerMiddleware(history),
    )),
  );

  if (module.hot) {
    module.hot.accept('data/rootReducer', () => {
      const nextRootReducer = require('data/rootReducer'); // eslint-disable-line global-require
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};
