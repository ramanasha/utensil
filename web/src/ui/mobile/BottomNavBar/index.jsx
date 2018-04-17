import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './styles.scss';

const tabs = ['Restaurants', 'Groups', 'Your Order', 'Account'];
const icons = ['utensils', 'users', 'shopping-bag', 'user-circle']

const BottomNavBar = ({ currentTab, onChangeTab }) => (
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

const mapStateToProps = state => ({
  
});

const mapDispatchToProps = dispatch => ({
  
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BottomNavBar);
