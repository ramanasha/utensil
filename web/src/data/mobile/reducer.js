import { Map } from 'immutable';

import { types } from './actions';

const initialState = Map({ currentTab: 'Restaurants' });

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SWITCH_TAB:
      return state.set('currentTab', action.newTab);

    default:
      return state;
  }
};
