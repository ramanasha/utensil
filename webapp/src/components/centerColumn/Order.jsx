import React, { Component } from 'react';
import { connect } from 'react-redux';

import CenterColumn from './CenterColumn';
import MenuPanel from '../panels/menu/MenuPanel';
import CurrentOrderPanel from '../panels/currentOrder/CurrentOrderPanel';
import PizzaBuilderPanel from '../panels/pizzaBuilder/PizzaBuilderPanel';
import NewGroupOptionsPanel from '../panels/orderOptions/NewGroupOptionsPanel';
import NewOrderConfirmPanel from '../panels/orderOptions/NewOrderConfirmPanel';
import { getGroupRestaurantId } from '../../selectors';

class Order extends Component {
    render() {
        const { mode, stage, menuId, params, children } = this.props;

        if (!children) {
            return (
                <CenterColumn>
                    {stage == 'choose' ?
                        <MenuPanel id={menuId} viewOnly={false}/>
                        : null}
                    {stage != 'pizza' ?
                        <CurrentOrderPanel/>
                        : <PizzaBuilderPanel id={menuId}/>}
                    {stage == 'confirm' ?
                        (mode == 'join' ?
                            <NewOrderConfirmPanel id={parseInt(params.id)}/>
                            : <NewGroupOptionsPanel mode={mode} id={parseInt(params.id)}/>)
                        : null}
                </CenterColumn>
            );
        } else {
            return (
                <CenterColumn>
                    {React.cloneElement(children, { id: parseInt(params.id) })}
                </CenterColumn>
            );
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    const mode = ownProps.route.path.split('/')[0];
    return {
        mode,
        stage: state.centerColumn.currentOrder.get('stage'),
        menuId: mode == 'start' ?
            parseInt(ownProps.params.id)
            : getGroupRestaurantId(state, parseInt(ownProps.params.id))
    };
};

export default connect(
    mapStateToProps
)(Order)
