import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { LinkButton } from 'common/components';

import { groupSelectors } from 'data/groups';

const MyOrderPreview = ({ orderId, restaurantName, orderItems }) => (
  <div className='my-order-preview'>
    <div className='info'>
      <div className='restaurant-name'>{restaurantName}</div>
      <div className='num-items'>
        {orderItems.length} item{orderItems.length > 1 ? 's' : null}
      </div>
    </div>
    <LinkButton text='View Details' to={`/order-details/${orderId}`} />
  </div>
);

MyOrderPreview.propTypes = {
  orderId: PropTypes.number.isRequired,
  restaurantName: PropTypes.string.isRequired,
  orderItems: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};

const { getGroupRestaurantName } = groupSelectors;

const mapStateToProps = (state, { groupId }) => ({
  restaurantName: getGroupRestaurantName(state, groupId, 'my'),
});

export default connect(
  mapStateToProps,
)(MyOrderPreview);
