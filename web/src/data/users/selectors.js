// eslint-disable-next-line import/prefer-default-export
export const getUsername = (state, userId) => state.getIn(['users', userId], '');
