import { List } from 'immutable';

// eslint-disable-next-line import/prefer-default-export
export const getMenu = (state, id) => state.getIn(['menus', id], List());
