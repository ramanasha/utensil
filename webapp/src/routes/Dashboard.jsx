import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { groupSelectors } from 'data/groups';

import Helper from '../ui/columns/CenterColumn/Helper';
import MyOrderSummaryPanel from '../ui/panels/MyOrderSummaryPanel';
import OrganizedGroupSummaryPanel from '../ui/panels/OrganizedGroupSummaryPanel';

const Dashboard = ({ hasJoinedGroup, hasOrganizedGroup }) => (
  <>
    {hasJoinedGroup ?
        <MyOrderSummaryPanel />
        : null}
    <Helper />
    {hasOrganizedGroup ?
        <OrganizedGroupSummaryPanel />
        : null},
  </>
);

Dashboard.propTypes = {
  hasJoinedGroup: PropTypes.bool.isRequired,
  hasOrganizedGroup: PropTypes.bool.isRequired,
};

const { hasUserJoinedGroup, hasUserOrganizedGroup } = groupSelectors;

const mapStateToProps = state => ({
  hasJoinedGroup: hasUserJoinedGroup(state),
  hasOrganizedGroup: hasUserOrganizedGroup(state),
});

export default connect(
  mapStateToProps,
)(Dashboard);
