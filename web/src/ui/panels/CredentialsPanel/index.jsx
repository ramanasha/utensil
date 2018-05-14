import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Button, LinkButton } from 'common/components';

import { currentUserSelectors } from 'data/currentUser';
import { loginActions } from 'data/login';

import './styles.scss';

const CredentialsPanel = ({ username, logOut }) => (
  <div className='credentials-panel'>
    <div className='signed-in'>
      <div>Currently signed in as</div>
      <div className='email'>{username}</div>
    </div>
    <div className='account-buttons'>
      <Button text='Sign Out' onClick={logOut} />
      <LinkButton text='View Account' to='/account' />
    </div>
  </div>
);

CredentialsPanel.propTypes = {
  username: PropTypes.string.isRequired,
  logOut: PropTypes.func.isRequired,
};

const { getCurrentUsername } = currentUserSelectors;
const { logOut } = loginActions;

const mapStateToProps = state => ({
  username: getCurrentUsername(state),
});

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(logOut()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CredentialsPanel);
