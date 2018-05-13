import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Button, PanelHeader } from 'common/components';

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
      <Button text='Change Username' />
      <Button text='Change Password' />
      <Button text='Sign Out' onClick={logOut} />
    </div>
    <div className={`account-section ${splitwiseAuth ? 'ok' : 'alert'}`}>
      <div className='account-section-header'>
        You are {!splitwiseAuth ? 'not yet' : ''} authenticated with Splitwise.
      </div>
      {splitwiseAuth ?
        <Button text='View Debts' />
        : <Button text='Link Account' />
      }
    </div>
    <div className={`account-section ${notifications ? 'ok' : 'alert'}`}>
      <div className='account-section-header'>
        You have {!notifications ? 'not yet' : ''} set up text notifications.
      </div>
      {notifications ?
        <Button text='Change Settings' />
        : <Button text='Set Up' />
      }
    </div>
  </div>
);

MyAccountPanel.propTypes = {
  username: PropTypes.string.isRequired,
  logOut: PropTypes.func.isRequired,
  splitwiseAuth: PropTypes.bool.isRequired,
  notifications: PropTypes.bool.isRequired,
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
