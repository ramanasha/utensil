import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Range } from 'common/components';

import { currentOrderSelectors, currentOrderActions } from 'data/currentOrder';

const OverheadPreference = ({ value, onChange }) => (
  <div className='order-option'>
    <div className='order-option-heading'>
      How much do you need to cover delivery and other costs?
    </div>
    <div className='order-option-heading'>
      Don&apos;t include meal tax.
    </div>
    <Range
      min={0}
      max={20}
      step={1}
      value={value}
      onChange={onChange}
      label={`${value}%`}
    />
  </div>
);

OverheadPreference.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

const { getOrderOverhead } = currentOrderSelectors;
const { setOrderOverhead } = currentOrderActions;

const mapStateToProps = state => ({
  value: getOrderOverhead(state),
});

const mapDispatchToProps = dispatch => ({
  onChange: value => dispatch(setOrderOverhead(value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OverheadPreference);
