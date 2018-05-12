import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const Button = ({ text, onClick }) => (
  <button className='button' onClick={onClick}>{text}</button>
);

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  onClick: () => {},
};

export default Button;
