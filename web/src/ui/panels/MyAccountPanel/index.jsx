import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { PanelHeader } from 'common/components';

import { currentUserSelectors } from 'data/currentUser';
import { loginActions } from 'data/login';

import './styles.scss';

const MyAccountPanel = ({ username, logOut, splitwiseAuth, notifications }) => (
  <div className='my-account-panel'>
    <PanelHeader name='Your Account' />
    <div className='account-section'>
      <div className='account-section-header'>
        Signed in as <span className='current-user'>{username}</span>
      </div>
      <button className='button'>Change Username</button>
      <button className='button'>Change Password</button>
      <button className='button sign-out' onClick={logOut}>Sign Out</button>
    </div>
    <div className={`account-section ${splitwiseAuth ? 'ok' : 'alert'}`}>
      <div className='account-section-header'>
        You are {!splitwiseAuth ? 'not yet' : ''} authenticated with Splitwise.
      </div>
      {splitwiseAuth ?
        <button className='button'>View Debts</button>
        : <button className='button'>Link Account</button>
      }
    </div>
    <div className={`account-section ${notifications ? 'ok' : 'alert'}`}>
      <div className='account-section-header'>
        You have {!notifications ? 'not yet' : ''} set up text notifications.
      </div>
      {notifications ?
        <button className='button'>Change Settings</button>
        : <button className='button'>Set Up</button>
      }
    </div>
  </div>
);

MyAccountPanel.propTypes = {
  username: PropTypes.string.isRequired,
  logOut: PropTypes.func.isRequired,
  splitwiseAuth: PropTypes.bool.isRequired,
};

const { getCurrentUsername, getSplitwiseAuth } = currentUserSelectors;
const { logOut } = loginActions;

const mapStateToProps = state => ({
  username: getCurrentUsername(state),
  splitwiseAuth: getSplitwiseAuth(state),
});

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(logOut()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyAccountPanel);
