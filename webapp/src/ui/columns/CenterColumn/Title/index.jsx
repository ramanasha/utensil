import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const Title = ({ terse }) => (
  <div className='title'>
    <div className='heading'>Consamables</div>
    {!terse ?
      <div className='subheading'>Order food with your friends</div>
      : null
    }
  </div>
);

Title.propTypes = { terse: PropTypes.bool };

Title.defaultProps = { terse: false };

export default Title;
