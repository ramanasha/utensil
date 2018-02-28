import React, { Fragment } from 'react';
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
      <Fragment>
        <MenuPanel id={menuId} viewOnly={false} />
        <CurrentOrderPanel />
      </Fragment>
    );

    case 'confirm': return (
      <Fragment>
        <CurrentOrderPanel />
        {mode === 'join' ?
          <NewOrderConfirmPanel id={id} />
          :
          <NewGroupOptionsPanel mode={mode} id={id} />
        }
      </Fragment>
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

const mapStateToProps = (state, { match: { path }, id }) => {
  const mode = path.split('/')[1];
  return {
    mode,
    stage: getCurrentOrderStage(state),
    menuId: mode === 'start' ? id : getGroupRestaurantId(state, id),
  };
};

export default parseId(connect(mapStateToProps)(Order));
