import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Range } from 'common/components';

import { suggestedOrderSelectors, suggestedOrderActions } from 'data/suggestedOrder';

const WaitTimePreference = ({ value, onChange }) => (
  <div className='suggestion-option'>
    <div className='suggestion-option-heading'>How long can you wait?</div>
    <Range
      min={10}
      max={120}
      step={5}
      value={value}
      onChange={onChange}
      label={`${value} minutes`}
    />
  </div>
);

WaitTimePreference.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

const { getWaitTimePreference } = suggestedOrderSelectors;
const { setWaitTimePreference } = suggestedOrderActions;

const mapStateToProps = state => ({
  value: getWaitTimePreference(state),
});

const mapDispatchToProps = dispatch => ({
  onChange: value => dispatch(setWaitTimePreference(value, 'suggest')),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WaitTimePreference);
