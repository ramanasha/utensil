import '../../../styles/panels/pizza-builder-panel.scss';

import React from 'react';
import { connect } from 'react-redux';

import PanelHeader from '../PanelHeader';
import ToppingsSection from './ToppingsSection';
import CheeseSelection from './CheeseSelection';
import SauceSelection from './SauceSelection';
import SideToppings from './SideToppings';
import { closePizzaBuilder, setInitialSauce, setMaxToppings } from '../../../actions';
import { pizzaAtCapacity } from '../../../helpers';

class PizzaBuilderPanel extends React.Component {
    componentDidMount() {
        const {
            sauces, maxToppings,
            setSauce, setMaxToppings
        } = this.props;
        setSauce(sauces.get('default'));
        setMaxToppings(maxToppings);
    }

    render() {
        const {
            toppings, sauces, maxToppings, hasToppings,
            close
        } = this.props;

        return (
            <div className="pizza-builder-panel">
                <PanelHeader name="Pizza Builder"/>
                <div className="toppings">
                    <ToppingsSection name="Meats" toppings={toppings.get('meats')}/>
                    <ToppingsSection name="Non-Meats" toppings={toppings.get('non-meats')}/>
                </div>
                <CheeseSelection options={['No Cheese', 'Normal Cheese', 'Extra Cheese']}/>
                <SauceSelection options={['No Sauce', sauces.get('default'), ...sauces.get('other').toArray()]}/>
                {hasToppings ?
                    <div className="choice-display">
                        <SideToppings side="left"/>
                        <SideToppings side="whole"/>
                        <SideToppings side="right"/>
                    </div>
                    : <div className="no-toppings">No Toppings</div>}
                <div className="toolbar">
                    <button className="button" onClick={close}>Cancel</button>
                    <button className="button">Add to Order</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const restaurantId = state.centerColumn.currentOrder.get('restaurantId');
    const options = state.restaurants.getIn([restaurantId, 'data', 'pizza']);
    const itemId = state.centerColumn.pizzaBuilder.get('itemId');
    return {
        toppings: options.get('toppings'),
        sauces: options.get('sauces'),
        maxToppings: state.items.getIn([itemId, 'data', 'pizza', 'maxToppings']),
        hasToppings: state.centerColumn.pizzaBuilder.get('toppings').size > 0
    };
};

const mapDispatchToProps = dispatch => ({
    close: () => dispatch(closePizzaBuilder()),
    setSauce: sauce => dispatch(setInitialSauce(sauce)),
    setMaxToppings: value => dispatch(setMaxToppings(value))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PizzaBuilderPanel)
