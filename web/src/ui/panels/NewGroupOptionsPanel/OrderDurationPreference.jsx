import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Range } from 'common/components';

import { currentOrderSelectors, currentOrderActions } from 'data/currentOrder';

const OrderDurationPreference = ({ value, onChange }) => (
  <div className='order-option'>
    <div className='order-option-heading'>How long should this be open?</div>
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

OrderDurationPreference.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

const { getOrderDuration } = currentOrderSelectors;
const { setOrderDuration } = currentOrderActions;

const mapStateToProps = state => ({
  value: getOrderDuration(state),
});

const mapDispatchToProps = dispatch => ({
  onChange: value => dispatch(setOrderDuration(value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderDurationPreference);
