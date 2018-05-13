import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Range } from 'common/components';

import { suggestedOrderSelectors, suggestedOrderActions } from 'data/suggestedOrder';

const MinPeoplePreference = ({ value, onChange }) => (
  <div className='suggestion-option'>
    <div className='suggestion-option-heading'>How many more people would it take?</div>
    <Range
      min={1}
      max={4}
      step={1}
      value={value}
      onChange={onChange}
      label={`${value} ${value > 1 ? 'people' : 'person'}`}
    />
  </div>
);

MinPeoplePreference.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

const { getMinPeoplePreference } = suggestedOrderSelectors;
const { setMinPeoplePreference } = suggestedOrderActions;

const mapStateToProps = state => ({
  value: getMinPeoplePreference(state),
});

const mapDispatchToProps = dispatch => ({
  onChange: value => dispatch(setMinPeoplePreference(value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MinPeoplePreference);
