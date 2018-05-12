import { connect } from 'react-redux';

import { loginActions } from 'data/login';

import { Button } from 'common/components';

const { submitNewAccount } = loginActions;

const mapStateToProps = () => ({ text: 'Create account' });

const mapDispatchToProps = dispatch => ({
  onClick: data => dispatch(submitNewAccount(data)),
});

const CreateAccountButton = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Button);

export default CreateAccountButton;
