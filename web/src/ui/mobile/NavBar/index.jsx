import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { mobileSelectors, mobileActions } from 'data/mobile';

import './styles.scss';

const tabs = ['Restaurants', 'Groups', 'Your Order', 'Account'];
const icons = ['utensils', 'users', 'shopping-bag', 'user-circle']

const NavBar = ({ currentTab, onChangeTab }) => (
  <div className='mobile-bottom-navbar'>
    {tabs.map((tab, index) => (
      <div
        className={`mobile-bottom-navbar-tab${currentTab === tab ? ' selected' : ''}`}
        key={index}
        onClick={() => onChangeTab(tab)}
      >
        <i className={`fas fa-${icons[index]}`} />
        <div className='tab-label'>{tab}</div>
      </div>
    ))}
  </div>
);

const { getCurrentTab } = mobileSelectors;
const { switchTab } = mobileActions;

const mapStateToProps = state => ({
  currentTab: getCurrentTab(state),
});

const mapDispatchToProps = dispatch => ({
  onChangeTab: tab => dispatch(switchTab(tab)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
