import { connect } from 'react-redux';

import { parseId } from 'common/utils';

import { currentOrderActions } from 'data/currentOrder';

import { Button } from 'common/components';

const mapStateToProps = () => ({ text: 'Join Order' });

const { submitNewOrder } = currentOrderActions;

const mapDispatchToProps = (dispatch, { id }) => ({
  onClick: () => dispatch(submitNewOrder(id)),
});

const SubmitNewOrder = parseId(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Button));

export default SubmitNewOrder;
