import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const Input = ({ type, value, onChange }) => (
  <input
    className='input'
    type={type}
    value={value}
    onChange={e => onChange(e.currentTarget.value)}
  />
);

Input.propTypes = {
  type: PropTypes.oneOf(['text', 'password', 'number']),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
};

Input.defaultProps = {
  type: 'text',
};

export default Input;
