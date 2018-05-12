import { connect } from 'react-redux';

import { suggestedOrderActions } from 'data/suggestedOrder';

import { Button } from 'common/components';

const { submitSuggestion } = suggestedOrderActions;

const mapStateToProps = () => ({ text: 'Submit Suggestion' });

const mapDispatchToProps = (dispatch, { id }) => ({
  onClick: () => dispatch(submitSuggestion(id)),
});

const SubmitSuggestion = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Button);

export default SubmitSuggestion;
