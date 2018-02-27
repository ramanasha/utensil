import React from 'react';
import PropTypes from 'prop-types';

import { parseId } from 'common/utils';

import OrganizedGroupPanel from '../ui/panels/OrganizedGroupPanel';

const GroupDetails = ({ id }) => (
  <OrganizedGroupPanel id={id} />
);

GroupDetails.propTypes = { id: PropTypes.number.isRequired };

export default parseId(GroupDetails);
