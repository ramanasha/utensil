import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Phone, Default } from 'common/components';

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

const Dashboard = ({ hasJoinedGroup, hasOrganizedGroup, currentTab }) => {
  const TabComponent = {
    Restaurants: RestaurantPanel,
    Groups: () => (
      <Fragment>
        <ActiveGroupPanel />
        <PendingGroupPanel />
      </Fragment>
    ),
    'Your Order': MyOrderPanel,
    Account: MyAccountPanel,
  }[currentTab];

  return (
    <Fragment>
      <Default>
        {hasJoinedGroup ?
          <MyOrderSummaryPanel />
          : null}
        <Helper />
        {hasOrganizedGroup ?
          <OrganizedGroupSummaryPanel />
          : null}
      </Default>
      <Phone>
        <NavBar />
        <TabComponent />
      </Phone>
    </Fragment>
  );
};

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
