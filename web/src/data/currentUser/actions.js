import { createActionTypes, buildPostRequest } from 'common/utils';

import {
  getNewUsername,
  getCurrentPassword,
  getNewPassword,
  getConfirmNewPassword,
} from './selectors';

const prefix = 'CURRENT_USER';

export const types = createActionTypes([
  'SET_EDIT_MODE',
  'UPDATE_NEW_USERNAME_FIELD',
  'UPDATE_CURRENT_PASSWORD_FIELD',
  'UPDATE_NEW_PASSWORD_FIELD',
  'UPDATE_CONFIRM_NEW_PASSWORD_FIELD',
  'SEND_USERNAME_CHANGE',
  'USERNAME_CHANGE_SUCCESS',
  'USERNAME_CHANGE_FAILURE',
  'SEND_PASSWORD_CHANGE',
  'PASSWORD_CHANGE_SUCCESS',
  'PASSWORD_CHANGE_FAILURE',
], prefix);

export const actions = {
  setEditMode: mode => ({
    type: types.SET_EDIT_MODE,
    mode,
  }),

  updateNewUsernameField: value => ({
    type: types.UPDATE_NEW_USERNAME_FIELD,
    value,
  }),

  updateCurrentPasswordField: value => ({
    type: types.UPDATE_CURRENT_PASSWORD_FIELD,
    value,
  }),

  updateNewPasswordField: value => ({
    type: types.UPDATE_NEW_PASSWORD_FIELD,
    value,
  }),

  updateConfirmNewPasswordField: value => ({
    type: types.UPDATE_CONFIRM_NEW_PASSWORD_FIELD,
    value,
  }),


  sendUsernameChange: () => ({ type: types.SEND_USERNAME_CHANGE }),

  usernameChangeSuccess: username => ({
    type: types.USERNAME_CHANGE_SUCCESS,
    value: username,
  }),

  usernameChangeFailure: error => ({
    type: types.USERNAME_CHANGE_FAILURE,
    error,
  }),

  submitUsernameChange: () => (dispatch, getState) => {
    dispatch(actions.sendUsernameChange());
    fetch('/api/user/change-username', buildPostRequest({
      username: getNewUsername(getState()),
    }))
      .then(response => {
        response.json().then(json => {
          if (response.ok) {
            dispatch(actions.usernameChangeSuccess(json.email));
          } else {
            dispatch(actions.usernameChangeFailure(json.message));
          }
        });
      })
      .catch(() => dispatch(actions.usernameChangeFailure('Network Error')));
  },

  sendPasswordChange: () => ({ type: types.SEND_PASSWORD_CHANGE }),

  passwordChangeSuccess: () => ({ type: types.PASSWORD_CHANGE_SUCCESS }),

  passwordChangeFailure: error => ({
    type: types.PASSWORD_CHANGE_FAILURE,
    error,
  }),

  submitPasswordChange: () => (dispatch, getState) => {
    dispatch(actions.sendPasswordChange());
    const oldPassword = getCurrentPassword(getState());
    const password = getNewPassword(getState());
    const confirmPassword = getConfirmNewPassword(getState());
    if (password === confirmPassword) {
      fetch('/api/user/change-password', buildPostRequest({
        password,
        oldPassword,
      }))
        .then(response => {
          response.json().then(json => {
            if (response.ok) {
              dispatch(actions.passwordChangeSuccess(json.email));
              dispatch(actions.setEditMode(''));
              dispatch(actions.updateNewUsernameField(''));
            } else {
              dispatch(actions.passwordChangeFailure(json.message));
            }
          });
        })
        .catch(() => dispatch(actions.passwordChangeFailure('Network Error')));
    } else {
      dispatch(actions.passwordChangeFailure('Passwords must match.'));
    }
  },
};
