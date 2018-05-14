import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { CredentialInput } from 'common/components';

import { loginSelectors, loginActions } from 'data/login';

const PasswordField = ({ value, onChange }) => (
  <CredentialInput label='Password' type='password' value={value} onChange={onChange} />
);

PasswordField.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const { getPassword } = loginSelectors;
const { updatePasswordField } = loginActions;

const mapStateToProps = state => ({
  value: getPassword(state),
});

const mapDispatchToProps = dispatch => ({
  onChange: value => dispatch(updatePasswordField(value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PasswordField);
