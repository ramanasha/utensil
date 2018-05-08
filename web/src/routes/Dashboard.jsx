import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Responsive from 'react-responsive';

import { groupSelectors } from 'data/groups';
import { mobileSelectors } from 'data/mobile';

import Helper from '../ui/columns/CenterColumn/Helper';
import MyOrderSummaryPanel from '../ui/panels/MyOrderSummaryPanel';
import MyOrderPanel from '../ui/panels/MyOrderPanel';
import MyAccountPanel from '../ui/panels/MyAccountPanel';
import OrganizedGroupSummaryPanel from '../ui/panels/OrganizedGroupSummaryPanel';
import RestaurantPanel from '../ui/panels/RestaurantPanel';
import ActiveGroupPanel from '../ui/panels/ActiveGroupPanel';
import PendingGroupPanel from '../ui/panels/PendingGroupPanel';
import NavBar from '../ui/mobile/NavBar';

import breakpoints from 'common/styles/_media';

const mobileMax = parseInt(breakpoints.mobileMax);

const Dashboard = ({ hasJoinedGroup, hasOrganizedGroup, currentTab }) => (
  <Responsive maxWidth={mobileMax}>
    {matches => {
      if (!matches) {
        return (
          <Fragment>
            {hasJoinedGroup ?
              <MyOrderSummaryPanel />
              : null}
            <Helper />
            {hasOrganizedGroup ?
              <OrganizedGroupSummaryPanel />
              : null}
          </Fragment>
        );
      }
      const TabComponent = {
        Restaurants: RestaurantPanel,
        Groups: () => (
          <Fragment>
            <ActiveGroupPanel />
            <PendingGroupPanel />
          </Fragment>
        ),
        'Your Order': MyOrderPanel,
        'Account': MyAccountPanel,
      }[currentTab];

      return (
        <Fragment>
          <NavBar />
          <TabComponent />
        </Fragment>
      );
    }}
  </Responsive>
);

Dashboard.propTypes = {
  hasJoinedGroup: PropTypes.bool.isRequired,
  hasOrganizedGroup: PropTypes.bool.isRequired,
  currentTab: PropTypes.string.isRequired,
};

const { hasUserJoinedGroup, hasUserOrganizedGroup } = groupSelectors;
const { getCurrentTab } = mobileSelectors;

const mapStateToProps = state => ({
  hasJoinedGroup: hasUserJoinedGroup(state),
  hasOrganizedGroup: hasUserOrganizedGroup(state),
  currentTab: getCurrentTab(state),
});

export default connect(mapStateToProps)(Dashboard);
