import React from 'react';
import PropTypes from 'prop-types';

import { parseId } from 'common/utils';

import SuggestionPanel from '../ui/panels/SuggestionPanel';

const Suggest = ({ id }) => (
  <SuggestionPanel id={id} />
);

Suggest.propTypes = { id: PropTypes.number.isRequired };

export default parseId(Suggest);
