import React from 'react';
import PropTypes from 'prop-types';

import { parseId } from 'common/utils';

import MyOrderPanel from '../ui/panels/MyOrderPanel';

const OrderDetails = ({ id }) => (
  <MyOrderPanel id={id} />
);

OrderDetails.propTypes = { id: PropTypes.number.isRequired };

export default parseId(OrderDetails);
