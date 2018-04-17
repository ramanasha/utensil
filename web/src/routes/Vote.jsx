import React from 'react';
import PropTypes from 'prop-types';

import { parseId } from 'common/utils';

import VotingPanel from '../ui/panels/VotingPanel';

const Vote = ({ id }) => (
  <VotingPanel id={id} />
);

Vote.propTypes = { id: PropTypes.number.isRequired };

export default parseId(Vote);
