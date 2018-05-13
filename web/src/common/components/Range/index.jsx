import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

export default function Range({ min, max, step, value, onChange, label }) {
  return (
    <div className='range'>
      <input
        type='range'
        {...{ min, max, step, value }}
        onChange={e => onChange(parseInt(e.currentTarget.value, 10))}
      />
      {label ? <div className='range-label'>{label}</div> : null}
    </div>
  );
}

Range.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
};

Range.defaultProps = {
  min: 0,
  max: 100,
  step: 1,
  label: '',
};
