import { Map, fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import { loginActionTypes } from '../login';
import { types } from './actions';

const initialState = fromJS({
  loggedIn: false,
  accountSettings: {
    editMode: '',
    newUsername: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
    error: '',
  },
});

export default (state = initialState, action) => {
  switch (action.type) {
    case loginActionTypes.LOGIN_SUCCESS:
    case loginActionTypes.NEW_ACCOUNT_SUCCESS:
    case loginActionTypes.SET_USER_INFO:
      return state
        .set('loggedIn', true)
        .set('userId', action.id)
        .set('username', action.username)
        .set('splitwiseAuth', action.splitwiseAuth);

    case LOCATION_CHANGE:
      if (action.payload.pathname === '/login') {
        return state
          .set('loggedIn', false)
          .delete('userId')
          .delete('username')
          .delete('splitwiseAuth');
      }
      return state;

    case types.SET_EDIT_MODE: {
      const newState = state.setIn(['accountSettings', 'editMode'], action.mode);
      if (action.mode === '') {
        switch (state.getIn(['accountSettings', 'editMode'])) {
          case 'changeUsername':
            return newState.update(
              'accountSettings',
              settings => settings.set('newUsername', ''),
            );
          case 'changePassword':
            return newState.update(
              'accountSettings',
              settings => settings.merge(Map({
                currentPassword: '',
                newPassword: '',
                confirmNewPassword: '',
              })),
            );
          default:
            return newState;
        }
      }
      return newState;
    }

    case types.UPDATE_NEW_USERNAME_FIELD:
      return state.setIn(['accountSettings', 'newUsername'], action.value)
        .setIn(['accountSettings', 'error'], '');

    case types.UPDATE_CURRENT_PASSWORD_FIELD:
      return state.setIn(['accountSettings', 'currentPassword'], action.value)
        .setIn(['accountSettings', 'error'], '');

    case types.UPDATE_NEW_PASSWORD_FIELD:
      return state.setIn(['accountSettings', 'newPassword'], action.value)
        .setIn(['accountSettings', 'error'], '');

    case types.UPDATE_CONFIRM_NEW_PASSWORD_FIELD:
      return state.setIn(['accountSettings', 'confirmNewPassword'], action.value)
        .setIn(['accountSettings', 'error'], '');

    case types.USERNAME_CHANGE_SUCCESS:
      return state
        .set('username', action.value)
        .setIn(['accountSettings', 'editMode'], '')
        .setIn(['accountSettings', 'newUsername'], '');

    case types.USERNAME_CHANGE_FAILURE:
    case types.PASSWORD_CHANGE_FAILURE:
      return state.setIn(['accountSettings', 'error'], action.error);

    default:
      return state;
  }
};
