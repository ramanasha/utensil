import '../../../styles/panels/outing-panel.scss';
import '../../../styles/panels/new-group-options-panel';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import PanelHeader from '../PanelHeader';
import OrderDurationPreference from './OrderDurationPreference';
import SubmitNewOuting from './SubmitNewOuting';
import Spinner from '../Spinner';
import { getRestaurantName } from '../../../selectors';

class OutingPanel extends Component {
	render() {
		const { id, name, loading } = this.props;
		return (
			<div className="outing-panel">
				<PanelHeader name="Start an Outing"/>
				<div className="restaurant-name">{name}</div>
				<div className="order-options">
					<OrderDurationPreference/>
				</div>
				{loading ?
                    <Spinner/>
                    : <div className="toolbar">
                    <Link to={`/start/${id}`} className="button">Go Back</Link>
                    	<SubmitNewOuting id={id}/>
                    </div>}
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	name: getRestaurantName(state, ownProps.id),
	loading: state.centerColumn.currentOrder.get('loading')
});

export default connect(
	mapStateToProps
)(OutingPanel)
