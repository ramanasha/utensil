import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { mobileSelectors, mobileActions } from 'data/mobile';

import './styles.scss';

const tabs = ['Restaurants', 'Active Orders', 'Pending Orders'];

const NavBar = ({ currentTab, onChangeTab }) => (
  <div className='mobile-navbar'>
    {tabs.map((tab, index) => (
      <div
        className={`mobile-navbar-tab${currentTab === tab ? ' selected' : ''}`}
        key={index}
        onClick={() => onChangeTab(tab)}
      >
        {tab}
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
