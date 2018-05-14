import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Button, PanelHeader, Default, CloseButton } from 'common/components';

import { currentUserSelectors, currentUserActions } from 'data/currentUser';
import { loginActions } from 'data/login';

import ChangeUsername from './ChangeUsername';
import ChangePassword from './ChangePassword';

import './styles.scss';

function MyAccountPanel({
  username, editMode, splitwiseAuth, notifications, error,
  logOut, onChangeUsername, onChangePassword, onCancelEdit, onSubmitUsername, onSubmitPassword,
}) {
  return (
    <div className='my-account-panel'>
      <PanelHeader name='Your Account' />
      <Default>
        <CloseButton />
      </Default>
      <div className='account-section'>
        <div className='account-section-header'>
          Signed in as <span className='current-user'>{username}</span>
        </div>
        {!editMode ?
          <Fragment>
            <Button text='Change Username' onClick={onChangeUsername} />
            <Button text='Change Password' onClick={onChangePassword} />
            <Button text='Sign Out' onClick={logOut} />
          </Fragment>
          :
          <Fragment>
            {{
              changeUsername: <ChangeUsername />,
              changePassword: <ChangePassword />,
            }[editMode]}
            {error && <div className='error'>{error}</div>}
            <Button
              text='Submit'
              onClick={() => {
                switch (editMode) {
                  case 'changeUsername':
                    onSubmitUsername();
                    break;
                  case 'changePassword':
                    onSubmitPassword();
                    break;
                  default:
                }
              }}
            />
            <Button text='Cancel' onClick={onCancelEdit} />
          </Fragment>
        }
      </div>
      <div className={`account-section ${splitwiseAuth ? 'ok' : 'alert'}`}>
        <div className='account-section-header'>
          You are {!splitwiseAuth ? 'not yet' : ''} authenticated with Splitwise.
        </div>
        {!editMode && (splitwiseAuth ?
          <Button text='View Debts' />
          : <Button text='Link Account' />
        )}
      </div>
      <div className={`account-section ${notifications ? 'ok' : 'alert'}`}>
        <div className='account-section-header'>
          You have {!notifications ? 'not yet' : ''} set up text notifications.
        </div>
        {!editMode && (notifications ?
          <Button text='Change Settings' />
          : <Button text='Set Up' />
        )}
      </div>
    </div>
  );
}

MyAccountPanel.propTypes = {
  username: PropTypes.string.isRequired,
  editMode: PropTypes.string.isRequired,
  splitwiseAuth: PropTypes.bool.isRequired,
  notifications: PropTypes.bool.isRequired,
  logOut: PropTypes.func.isRequired,
  onChangeUsername: PropTypes.func.isRequired,
  onChangePassword: PropTypes.func.isRequired,
  onCancelEdit: PropTypes.func.isRequired,
  onSubmitUsername: PropTypes.func.isRequired,
  onSubmitPassword: PropTypes.func.isRequired,
};

const {
  getCurrentUsername,
  getEditMode,
  getSplitwiseAuth,
  getAccountSettingsError,
} = currentUserSelectors;
const { setEditMode, submitUsernameChange, submitPasswordChange } = currentUserActions;
const { logOut } = loginActions;

const mapStateToProps = state => ({
  username: getCurrentUsername(state),
  editMode: getEditMode(state),
  splitwiseAuth: getSplitwiseAuth(state),
  notifications: false, // TODO: make a thing for this
  error: getAccountSettingsError(state),
});

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(logOut()),
  onChangeUsername: () => dispatch(setEditMode('changeUsername')),
  onChangePassword: () => dispatch(setEditMode('changePassword')),
  onCancelEdit: () => dispatch(setEditMode('')),
  onSubmitUsername: () => dispatch(submitUsernameChange()),
  onSubmitPassword: () => dispatch(submitPasswordChange()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyAccountPanel);
