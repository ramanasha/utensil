import { Map } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

const initialState = Map({ location: null });

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOCATION_CHANGE:
      return state.set('location', Map(payload));

    default:
      return state;
  }
};
