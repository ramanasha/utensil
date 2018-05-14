import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { CredentialInput } from 'common/components';

import { loginSelectors, loginActions } from 'data/login';

const UsernameField = ({ value, onChange }) => (
  <CredentialInput label='Email' value={value} onChange={onChange} />
);

UsernameField.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const { getUsername } = loginSelectors;
const { updateUsernameField } = loginActions;

const mapStateToProps = state => ({
  value: getUsername(state),
});

const mapDispatchToProps = dispatch => ({
  onChange: value => dispatch(updateUsernameField(value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UsernameField);
