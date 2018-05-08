import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Responsive from 'react-responsive';
import qs from 'query-string';

import { toJS } from 'common/utils';

import { loginActions } from 'data/login';
import { groupActions } from 'data/groups';
import { restaurantActions } from 'data/restaurants';
import { currentUserSelectors } from 'data/currentUser';

import Routes from '../routes';

import LeftColumn from './columns/LeftColumn';
import CenterColumn from './columns/CenterColumn';
import RightColumn from './columns/RightColumn';
import Overlay from './Overlay';
import Title from './columns/CenterColumn/Title';
import NavBar from './mobile/NavBar';

import './master.scss';

import breakpoints from 'common/styles/_media.scss';

const mobileMax = parseInt(breakpoints.mobileMax);

class Layout extends Component {
  componentDidMount() {
    const {
      location: { pathname, search },
      loggedIn,
      splitwiseLoad, loadUserInfo, loadRestaurants, loadActiveOrders, loadPendingOrders,
      updateRestaurantHours,
    } = this.props;

    if (pathname === '/login/splitwise-auth') {
      const query = qs.parse(search);
      splitwiseLoad(query.code);
    } else {
      loadUserInfo();
    }
    loadRestaurants();
    loadActiveOrders();
    loadPendingOrders(loggedIn);

    this.restaurantUpdate = setInterval(updateRestaurantHours, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.restaurantUpdate);
  }

  render() {
    const { location, loggedIn } = this.props;

    const centerFocus = !/^\/(menu\/[0-9]+)?$/.test(location.pathname);
    const style = centerFocus ? { minWidth: '30em', padding: '0 15em' } : null;

    return (
      <Responsive maxWidth={mobileMax}>
        {matches => (
          <div className='app' style={matches ? null : style}>
            {matches ?
              <Fragment>
                <Title terse />
                <Routes />
                {loggedIn ? <NavBar /> : null}
              </Fragment>
              :
              <Fragment>
                <LeftColumn />
                <CenterColumn>
                  <Routes />
                </CenterColumn>
                <RightColumn />
                <Overlay centerFocus={centerFocus} />
              </Fragment>
            }
          </div>
        )}
      </Responsive>
    );
  }
}

Layout.propTypes = {
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired,
  loggedIn: PropTypes.bool.isRequired,
  splitwiseLoad: PropTypes.func.isRequired,
  loadUserInfo: PropTypes.func.isRequired,
  loadRestaurants: PropTypes.func.isRequired,
  loadActiveOrders: PropTypes.func.isRequired,
  loadPendingOrders: PropTypes.func.isRequired,
  updateRestaurantHours: PropTypes.func.isRequired,
};

const { verifyUser, verifyAndAuthenticateWithSplitwise } = loginActions;
const { fetchActiveGroups, fetchPendingGroups } = groupActions;
const { fetchRestaurants, updateRestaurantHours } = restaurantActions;
const { isCurrentUserLoggedIn } = currentUserSelectors;

const mapStateToProps = state => ({
  location: state.getIn(['router', 'location']),
  loggedIn: isCurrentUserLoggedIn(state),
});

const mapDispatchToProps = dispatch => ({
  splitwiseLoad: code => dispatch(verifyAndAuthenticateWithSplitwise(code)),
  loadUserInfo: () => dispatch(verifyUser()),
  loadRestaurants: () => dispatch(fetchRestaurants()),
  loadActiveOrders: () => dispatch(fetchActiveGroups()),
  loadPendingOrders: loggedIn => dispatch(fetchPendingGroups(loggedIn)),
  updateRestaurantHours: () => dispatch(updateRestaurantHours()),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJS(Layout)));
