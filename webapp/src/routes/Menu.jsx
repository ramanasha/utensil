import React from 'react';
import PropTypes from 'prop-types';

import { parseId } from 'common/utils';

import MenuPanel from '../ui/panels/MenuPanel';

const Menu = ({ id }) => (
  <MenuPanel id={id} viewOnly />
);

Menu.propTypes = { id: PropTypes.number.isRequired };

export default parseId(Menu);
