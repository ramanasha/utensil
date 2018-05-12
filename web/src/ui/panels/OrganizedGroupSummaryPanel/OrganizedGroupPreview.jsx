import React from 'react';
import PropTypes from 'prop-types';

import { LinkButton, OrderTimer } from 'common/components';

export default function OrganizedGroupPreview({
  groupId, restaurantName, type,
  timeStarted, durationMinutes,
}) {
  return (
    <div className='organized-group-preview'>
      <div className='description'>
        <div className='restaurant-name'>{restaurantName}</div>
        <div className='type'>{type.charAt(0).toUpperCase()}{type.slice(1)}</div>
      </div>
      <OrderTimer timeStarted={timeStarted} duration={durationMinutes} concise />
      <LinkButton text='View Details' to={`/group-details/${groupId}`} />
    </div>
  );
}

OrganizedGroupPreview.propTypes = {
  groupId: PropTypes.number.isRequired,
  restaurantName: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  timeStarted: PropTypes.number.isRequired,
  durationMinutes: PropTypes.number.isRequired,
};
