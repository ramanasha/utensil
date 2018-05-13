import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function LinkButton({ text, to, onClick }) {
  return <Link className='button' to={to} onClick={onClick}>{text}</Link>;
}

LinkButton.propTypes = {
  text: PropTypes.string.isRequired,
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
    pathname: PropTypes.string,
    search: PropTypes.string,
    hash: PropTypes.string,
    state: PropTypes.object,
  })]).isRequired,
  onClick: PropTypes.func,
};

LinkButton.defaultProps = {
  onClick: () => {},
};
