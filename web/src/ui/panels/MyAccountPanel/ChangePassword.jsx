import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { CredentialInput } from 'common/components';

import { currentUserSelectors, currentUserActions } from 'data/currentUser';

function ChangePassword({
  currentPassword, newPassword, confirmNewPassword,
  onChangeCurrent, onChangeNew, onChangeConfirm,
}) {
  return (
    <div className='account-settings-editor'>
      <CredentialInput
        label='Current Password'
        type='password'
        value={currentPassword}
        onChange={onChangeCurrent}
      />
      <CredentialInput
        label='New Password'
        type='password'
        value={newPassword}
        onChange={onChangeNew}
      />
      <CredentialInput
        label='Confirm New Password'
        type='password'
        value={confirmNewPassword}
        onChange={onChangeConfirm}
      />
    </div>
  );
}

ChangePassword.propTypes = {
  currentPassword: PropTypes.string.isRequired,
  newPassword: PropTypes.string.isRequired,
  confirmNewPassword: PropTypes.string.isRequired,
  onChangeCurrent: PropTypes.func.isRequired,
  onChangeNew: PropTypes.func.isRequired,
  onChangeConfirm: PropTypes.func.isRequired,
};

const { getCurrentPassword, getNewPassword, getConfirmNewPassword } = currentUserSelectors;
const {
  updateCurrentPasswordField,
  updateNewPasswordField,
  updateConfirmNewPasswordField,
} = currentUserActions;

const mapStateToProps = state => ({
  currentPassword: getCurrentPassword(state),
  newPassword: getNewPassword(state),
  confirmNewPassword: getConfirmNewPassword(state),
});

const mapDispatchToProps = dispatch => ({
  onChangeCurrent: value => dispatch(updateCurrentPasswordField(value)),
  onChangeNew: value => dispatch(updateNewPasswordField(value)),
  onChangeConfirm: value => dispatch(updateConfirmNewPasswordField(value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChangePassword);
