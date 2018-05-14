import React from 'react';
import PropTypes from 'prop-types';

import Input from '../Input';

import './styles.scss';

export default function CredentialInput({ type, label, value, onChange }) {
  return (
    <div className='credential-input'>
      <div className='credential-label'>{label}</div>
      <Input {...{ type, value, onChange }} />
    </div>
  );
}

CredentialInput.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
};

CredentialInput.defaultProps = {
  type: 'text',
};
