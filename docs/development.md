A couple of useful patterns that Utensil uses to make the development environment easier to work with:

## Hot Reloading
This is super useful and kind of tricky to set up properly. Since this project uses React Router and Redux alongside React, there are a lot 
of things to hot reload that don't work right out of the box. For the router, the trick is to wrap [the top-level routes component]
(../web/src/routes/index.jsx) as well as [the root UI component](../web/src/App.jsx) in the `hot` HOC. (Look at [the react-hot-loader docs]
(https://github.com/gaearon/react-hot-loader) for this pattern.) To hot reload the reducers, they need to be properly swapped in the Redux 
store, which this bit of code in [`configureStore`](../web/src/configureStore.js) accomplishes:
```javascript
if (module.hot) {
  module.hot.accept('data/rootReducer', () => {
    const nextRootReducer = require('data/rootReducer').default; // eslint-disable-line global-require
    store.replaceReducer(nextRootReducer);
  });
}
```

## Webpack Configuration
This is pretty common, but worth mentioning: lots of config options are the same in production as in development, but there are a few 
things like minification and API proxying that are environment specific. To make this easier, I use the `webpack-merge` utility to pull 
[`webpack.common.js`](../web/webpack.common.js) into both the [production](../web/webpack.prod.js) and [development](../web/webpack.dev.js) 
configurations.

A bit of a gotcha: For the most recent version of Babel (7.0.0 beta) most of the Babel-related packages now need to be installed under the
naming scheme `@babel/core`, for example...except `babel-eslint`. That one still exists under the same package name and actually requires 
the original `babel-core` as a dependency.
