import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { toJS } from 'common/utils';

import { pizzaBuilderSelectors, pizzaBuilderActions } from 'data/pizzaBuilder';
import { restaurantSelectors } from 'data/restaurants';
import { itemSelectors } from 'data/items';

import { Button, PanelHeader, LandscapePhone } from 'common/components';
import PizzaSizeSelection from './PizzaSizeSelection';
import ToppingsSection from './ToppingsSection';
import CheeseSelection from './CheeseSelection';
import SauceSelection from './SauceSelection';
import SideToppings from './SideToppings';

import './styles.scss';

class PizzaBuilderPanel extends React.Component {
  componentDidMount() {
    const { sauces, maxToppings, setSauce, setMaxToppings } = this.props;
    setSauce(sauces.default);
    setMaxToppings(maxToppings);
  }

  displayToppings() {
    if (this.props.hasToppings) {
      return (
        <div className='choice-display'>
          <SideToppings side='left' />
          <SideToppings side='whole' />
          <SideToppings side='right' />
        </div>
      );
    }
    return (
      <div className='no-toppings'>No Toppings</div>
    );
  }

  render() {
    const { toppings, sauces, whole, onClose, onAdd } = this.props;

    return (
      <div className='pizza-builder-panel'>
        <PanelHeader name='Pizza Builder' />
        <PizzaSizeSelection />
        <LandscapePhone>
          {matches => (
            <Fragment>
              <div className='toppings'>
                <ToppingsSection name='Meats' toppings={toppings.meats} />
                <ToppingsSection name='Non-Meats' toppings={toppings['non-meats']} />
                {whole && matches ? this.displayToppings() : null}
              </div>
              <div className='pizza-attributes'>
                <CheeseSelection options={['No Cheese', 'Normal Cheese', 'Extra Cheese']} />
                {whole ?
                  <SauceSelection options={['No Sauce', sauces.default, ...sauces.other]} />
                  : null}
              </div>
              {whole && !matches ? this.displayToppings() : null}
            </Fragment>
          )}
        </LandscapePhone>
        <div className='toolbar'>
          <Button text='Cancel' onClick={onClose} />
          <Button text='Add to Order' onClick={onAdd} />
        </div>
      </div>
    );
  }
}

PizzaBuilderPanel.propTypes = {
  toppings: PropTypes.shape({
    meats: PropTypes.arrayOf(PropTypes.string).isRequired,
    'non-meats': PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  sauces: PropTypes.shape({
    default: PropTypes.string.isRequired,
    other: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  maxToppings: PropTypes.number.isRequired,
  hasToppings: PropTypes.bool.isRequired,
  whole: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  setSauce: PropTypes.func.isRequired,
  setMaxToppings: PropTypes.func.isRequired,
};

const { getItemId, getPizzaSize, getCurrentToppings } = pizzaBuilderSelectors;
const { closePizzaBuilder, setInitialSauce, setMaxToppings, addPizzaToOrder } = pizzaBuilderActions;
const { getPizzaToppings, getPizzaSauces } = restaurantSelectors;
const { getMaxPizzaToppings } = itemSelectors;

const mapStateToProps = (state, { id }) => ({
  toppings: getPizzaToppings(state, id),
  sauces: getPizzaSauces(state, id),
  maxToppings: getMaxPizzaToppings(state, getItemId(state)),
  hasToppings: !!getCurrentToppings(state).size,
  whole: getPizzaSize(state) === 'whole',
});

const mapDispatchToProps = dispatch => ({
  close: () => dispatch(closePizzaBuilder()),
  setSauce: sauce => dispatch(setInitialSauce(sauce)),
  setMaxToppings: value => dispatch(setMaxToppings(value)),
  onAdd: () => dispatch(addPizzaToOrder()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJS(PizzaBuilderPanel));
