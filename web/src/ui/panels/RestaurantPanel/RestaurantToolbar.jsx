import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { LinkButton } from 'common/components';

import { currentUserSelectors } from 'data/currentUser';
import { currentOrderActions } from 'data/currentOrder';

const RestaurantToolbar = ({ id, open, loggedIn, onStartClick }) => (
  <div className='toolbar'>
    <LinkButton text='View Menu' to={`/menu/${id}`} />
    {loggedIn && open ?
      <Fragment>
        <LinkButton text='Start Order' to={`/start/${id}`} onClick={onStartClick} />
        <LinkButton text='Suggest Order' to={`/suggest/${id}`} />
      </Fragment>
      : null}
  </div>
);

RestaurantToolbar.propTypes = {
  id: PropTypes.number.isRequired,
  open: PropTypes.bool.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  onStartClick: PropTypes.func.isRequired,
};

const { isCurrentUserLoggedIn } = currentUserSelectors;
const { startOrder } = currentOrderActions;

const mapStateToProps = state => ({
  loggedIn: isCurrentUserLoggedIn(state),
});

const mapDispatchToProps = (dispatch, { restaurantId }) => ({
  onStartClick: () => dispatch(startOrder(restaurantId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RestaurantToolbar);
