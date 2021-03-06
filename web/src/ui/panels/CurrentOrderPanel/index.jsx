import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { toJS } from 'common/utils';

import { currentOrderSelectors, currentOrderActions } from 'data/currentOrder';

import { Button, PanelHeader } from 'common/components';
import OrderItem from './OrderItem';

import './styles.scss';

function CurrentOrderPanel({
  orderStarted, items, stage, orderTotal,
  onContinueClick, onBackClick,
}) {
  if (orderStarted) {
    return (
      <div className={classNames('current-order-panel', { confirm: stage === 'confirm' })}>
        <PanelHeader name='Your Order' />
        <div className='scrollable'>
          {items.map((item, index) => <OrderItem key={item.id} index={index} {...item} />)}
        </div>
        <div className='continue'>
          {stage === 'choose' ?
            <Button text='Continue' onClick={onContinueClick} />
            :
            <Button text='Return to Menu' onClick={onBackClick} />
          }
          <div className='order-total'>Total: ${orderTotal.toFixed(2)}</div>
        </div>
      </div>
    );
  }
  return null;
}

CurrentOrderPanel.propTypes = {
  orderStarted: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
  })).isRequired,
  stage: PropTypes.string.isRequired,
  orderTotal: PropTypes.number.isRequired,
  onContinueClick: PropTypes.func.isRequired,
  onBackClick: PropTypes.func.isRequired,
};

const { isOrderStarted, getOrderItems, getOrderTotal, getOrderStage } = currentOrderSelectors;
const { continueOrder, goBackToMenu } = currentOrderActions;

const mapStateToProps = state => ({
  orderStarted: isOrderStarted(state),
  items: getOrderItems(state),
  orderTotal: getOrderTotal(state),
  stage: getOrderStage(state),
});

const mapDispatchToProps = dispatch => ({
  onContinueClick: () => dispatch(continueOrder()),
  onBackClick: () => dispatch(goBackToMenu()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJS(CurrentOrderPanel));
