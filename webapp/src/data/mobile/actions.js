import { createActionTypes } from 'common/utils';

const prefix = 'MOBILE';

export const types = createActionTypes([
  'SWITCH_TAB',
], prefix);

export const actions = {
  switchTab: newTab => ({
    type: types.SWITCH_TAB,
    newTab,
  }),
};
