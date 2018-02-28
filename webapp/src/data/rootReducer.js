import { combineReducers } from 'redux-immutable';

import currentOrder from './currentOrder';
import currentUser from './currentUser';
import groups from './groups';
import items from './items';
import login from './login';
import menus from './menus';
import mobile from './mobile';
import pizzaBuilder from './pizzaBuilder';
import restaurants from './restaurants';
import suggestedOrder from './suggestedOrder';
import users from './users';
import router from './router';

export default combineReducers({
  currentOrder,
  currentUser,
  groups,
  items,
  login,
  menus,
  mobile,
  pizzaBuilder,
  restaurants,
  suggestedOrder,
  users,
  router,
});
