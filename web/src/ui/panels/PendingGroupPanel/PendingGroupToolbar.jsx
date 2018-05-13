import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { LinkButton } from 'common/components';

import { currentOrderActions } from 'data/currentOrder';

const PendingGroupToolbar = ({ id, hasVoted, onJoin, onStart }) => (
  <div className='toolbar'>
    {!hasVoted ?
      <LinkButton text='Join Queue' to={`/vote/${id}`} onClick={onJoin} />
      : <div className='already-voted'>Joined</div>}
    <LinkButton text='Start Order' to={`/activate/${id}`} onClick={onStart} />
  </div>
);

PendingGroupToolbar.propTypes = {
  id: PropTypes.number.isRequired,
  hasVoted: PropTypes.bool.isRequired,
  onJoin: PropTypes.func.isRequired,
  onStart: PropTypes.func.isRequired,
};

const { activateOrder } = currentOrderActions;

const mapDispatchToProps = (dispatch, { restaurantId, groupId }) => ({
  onJoin: () => {},
  onStart: () => dispatch(activateOrder(restaurantId, groupId)),
});

export default connect(
  () => ({}),
  mapDispatchToProps,
)(PendingGroupToolbar);
