import { connect } from 'react-redux';

import SubmitButton from '../SubmitButton';
import { getGroupRestaurantId } from '../../../selectors';
import { submitNewGroup } from '../../../actions';

const mapStateToProps = (state, ownProps) => ({
    text: 'Start Outing',
    data: {
        activeGroup: {
            restaurantId: parseInt(ownProps.id),
            type: 'outing',
            durationMinutes: state.centerColumn.currentOrder.getIn(['options', 'duration']),
            organizerId: state.currentUser.get('userId')
        },
        order: {
            userId: state.currentUser.get('userId')
        }
    }
});

const mapDispatchToProps = dispatch => ({
    submit: data => dispatch(submitNewGroup(data))
});

const SubmitNewOuting = connect(
    mapStateToProps,
    mapDispatchToProps
)(SubmitButton);

export default SubmitNewOuting
