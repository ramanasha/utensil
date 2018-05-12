import { connect } from 'react-redux';

import { parseId } from 'common/utils';

import { currentOrderActions } from 'data/currentOrder';

import { Button } from 'common/components';

const mapStateToProps = () => ({ text: 'Start Order' });

const { submitNewGroup } = currentOrderActions;

const mapDispatchToProps = (dispatch, { id }) => ({
  onClick: () => dispatch(submitNewGroup(id)),
});

const SubmitNewGroup = parseId(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Button));

export default SubmitNewGroup;
