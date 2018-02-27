import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { parseId } from 'common/utils';

import { currentOrderSelectors } from 'data/currentOrder';
import { groupSelectors } from 'data/groups';

import MenuPanel from '../ui/panels/MenuPanel';
import CurrentOrderPanel from '../ui/panels/CurrentOrderPanel';
import PizzaBuilderPanel from '../ui/panels/PizzaBuilderPanel';
import NewGroupOptionsPanel from '../ui/panels/NewGroupOptionsPanel';
import NewOrderConfirmPanel from '../ui/panels/NewOrderConfirmPanel';

const Order = ({ mode, stage, menuId, id }) => {
  switch (stage) {
    case 'choose': return (
      <>
        <MenuPanel id={menuId} viewOnly={false} />
        <CurrentOrderPanel />
      </>
    );

    case 'confirm': return (
      <>
        <CurrentOrderPanel />
        {mode === 'join' ?
          <NewOrderConfirmPanel id={id} />
          :
          <NewGroupOptionsPanel mode={mode} id={id} />
        }
      </>
    );

    case 'pizza': return (
      <PizzaBuilderPanel id={menuId} />
    );

    default: return null;
  }
};

Order.propTypes = {
  mode: PropTypes.oneOf(['start', 'join', 'activate']).isRequired,
  stage: PropTypes.oneOf(['choose', 'confirm', 'pizza']).isRequired,
  menuId: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
};

const { getCurrentOrderStage } = currentOrderSelectors;
const { getGroupRestaurantId } = groupSelectors;

const mapStateToProps = (state, { route: { path }, id }) => {
  const mode = path.split('/')[0];
  return {
    mode,
    stage: getCurrentOrderStage(state),
    menuId: mode === 'start' ? id : getGroupRestaurantId(state, id),
  };
};

export default parseId(connect(
  mapStateToProps,
)(Order));
