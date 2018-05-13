import { connect } from 'react-redux';

import { parseId } from 'common/utils';

import { currentOrderActions } from 'data/currentOrder';

import { Button } from 'common/components';

const { submitActivatedGroup } = currentOrderActions;

const mapStateToProps = () => ({ text: 'Start Order' });

const mapDispatchToProps = (dispatch, { id }) => ({
  onClick: () => dispatch(submitActivatedGroup(id)),
});

const SubmitActivatedGroup = parseId(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Button));

export default SubmitActivatedGroup;
