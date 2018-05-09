import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { toJS } from 'common/utils';

import { mobileSelectors, mobileActions } from 'data/mobile';
import { groupSelectors } from 'data/groups';

import './styles.scss';

const tabs = [
  { name: 'Restaurants', icon: 'utensils' },
  { name: 'Groups', icon: 'users' },
  { name: 'Your Order', icon: 'shopping-bag' },
  { name: 'Account', icon: 'user-circle' },
];

const NavBar = ({ currentTab, inactiveTabs, onChangeTab }) => (
  <div className='mobile-bottom-navbar'>
    {tabs.map(({ name, icon }, index) => {
      const inactive = inactiveTabs.includes(name);
      const selected = currentTab === name;
      const className = classNames(['mobile-bottom-navbar-tab', { inactive, selected }]);
      return (
        <div
          className={className}
          key={index} // eslint-disable-line react/no-array-index-key
          onClick={() => { if (!inactive) { onChangeTab(name); } }}
        >
          <i className={`fas fa-${icon}`} />
          <div className='tab-label'>{name}</div>
        </div>
      );
    })}
  </div>
);

NavBar.propTypes = {
  currentTab: PropTypes.string.isRequired,
  inactiveTabs: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChangeTab: PropTypes.func.isRequired,
};

const { getCurrentTab } = mobileSelectors;
const { switchTab } = mobileActions;
const { getMyOrders } = groupSelectors;

const mapStateToProps = state => ({
  currentTab: getCurrentTab(state),
  inactiveTabs: getMyOrders(state).length ? [] : ['Your Order'],
});

const mapDispatchToProps = dispatch => ({
  onChangeTab: tab => dispatch(switchTab(tab)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJS(NavBar));
