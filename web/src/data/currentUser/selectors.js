export const isCurrentUserLoggedIn = state => state.getIn(['currentUser', 'loggedIn']);

export const getCurrentUsername = state => state.getIn(['currentUser', 'username']);

export const getCurrentUserId = state => state.getIn(['currentUser', 'userId']);

export const getSplitwiseAuth = state => state.getIn(['currentUser', 'splitwiseAuth']);

export const getEditMode = state => state.getIn(['currentUser', 'accountSettings', 'editMode']);

export const getNewUsername = state => state.getIn(
  ['currentUser', 'accountSettings', 'newUsername'],
);

export const getCurrentPassword = state => state.getIn(
  ['currentUser', 'accountSettings', 'currentPassword'],
);

export const getNewPassword = state => state.getIn(
  ['currentUser', 'accountSettings', 'newPassword'],
);

export const getConfirmNewPassword = state => state.getIn(
  ['currentUser', 'accountSettings', 'confirmNewPassword'],
);

export const getAccountSettingsError = state => state.getIn(
  ['currentUser', 'accountSettings', 'error'],
);
