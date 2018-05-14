import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { CredentialInput } from 'common/components';

import { currentUserSelectors, currentUserActions } from 'data/currentUser';

function ChangeUsername({ username, onChangeUsername }) {
  return (
    <div className='account-settings-editor'>
      <CredentialInput label='New Username' value={username} onChange={onChangeUsername} />
    </div>
  );
}

ChangeUsername.propTypes = {
  username: PropTypes.string.isRequired,
  onChangeUsername: PropTypes.func.isRequired,
};

const { getNewUsername } = currentUserSelectors;
const { updateNewUsernameField } = currentUserActions;

const mapStateToProps = state => ({
  username: getNewUsername(state),
});

const mapDispatchToProps = dispatch => ({
  onChangeUsername: value => dispatch(updateNewUsernameField(value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChangeUsername);
