import { connect } from 'react-redux';

import { suggestedOrderActions } from 'data/suggestedOrder';

import { Button } from 'common/components';

const { submitVote } = suggestedOrderActions;

const mapStateToProps = () => ({ text: 'Submit Vote' });

const mapDispatchToProps = (dispatch, { id }) => ({
  onClick: () => dispatch(submitVote(id)),
});

const SubmitVote = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Button);

export default SubmitVote;
