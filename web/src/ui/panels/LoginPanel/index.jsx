import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { loginSelectors, loginActions } from 'data/login';
import { currentUserSelectors } from 'data/currentUser';

import { LinkButton, Button, PanelHeader, Spinner } from 'common/components';
import UsernameField from './UsernameField';
import PasswordField from './PasswordField';

import './styles.scss';

class LoginPanel extends React.Component {
  componentDidMount() {
    const { loggedIn, exitLogin } = this.props;

    if (loggedIn) {
      exitLogin();
    }
  }

  componentWillReceiveProps({ loggedIn }) {
    if (loggedIn) {
      this.props.exitLogin();
    }
  }

  render() {
    const { loading, error, onSubmit } = this.props;

    return (
      <div className='login-panel'>
        <PanelHeader name='Log into Utensil' />
        <form className='login' onSubmit={onSubmit}>
          <div className='login-fields'>
            <UsernameField />
            <PasswordField />
          </div>
          {loading ?
            <Spinner />
            : <Button text='Sign in' />}
          {error ?
            <div className='error'>{error}</div>
            : null}
        </form>
        <div className='create-account'>
          <div>Don&apos;t have an account yet?</div>
          <LinkButton text='Get started' to='/login/create' />
        </div>
      </div>
    );
  }
}

LoginPanel.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  loggedIn: PropTypes.bool.isRequired,
  exitLogin: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

LoginPanel.defaultProps = { error: '' };

const { isLoading, getError } = loginSelectors;
const { isCurrentUserLoggedIn } = currentUserSelectors;
const { submitLogin } = loginActions;

const mapStateToProps = state => ({
  loading: isLoading(state),
  error: getError(state),
  loggedIn: isCurrentUserLoggedIn(state),
});

const mapDispatchToProps = dispatch => ({
  exitLogin: () => dispatch(push('/')),
  onSubmit: e => {
    e.preventDefault();
    dispatch(submitLogin());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginPanel);
