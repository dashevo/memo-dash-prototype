const UserActionTypes = {
  USER_PROFILE_RECEIVED: 'USER_PROFILE_RECEIVED',
  OWN_MEMOS_RECEIVED: 'OWN_MEMOS_RECEIVED',
  ALL_MEMOS_RECEIVED: 'ALL_MEMOS_RECEIVED'
}

const memoDashLib = getState => {
  const {
    root: { memoDashLib }
  } = getState()

  return memoDashLib
}

const getUserProfile = () => async (dispatch, getState) => {
  const userProfile = await memoDashLib(getState).getUserProfile()
  dispatch(userProfileReceived(userProfile))
}

const userProfileReceived = userProfile => ({
  type: UserActionTypes.USER_PROFILE_RECEIVED,
  payload: userProfile
})

const getOwnMemos = () => async (dispatch, getState) => {
  const memos = await memoDashLib(getState).getOwnMemos()
  dispatch(ownMemosReceived(memos))
}

const ownMemosReceived = memos => ({
  type: UserActionTypes.OWN_MEMOS_RECEIVED,
  payload: memos
})

const getAllMemos = () => async (dispatch, getState) => {
  const memos = await memoDashLib(getState).getAllMemos()
  dispatch(allMemosReceived(memos))
}

const allMemosReceived = memos => ({
  type: UserActionTypes.ALL_MEMOS_RECEIVED,
  payload: memos
})

export {
  UserActionTypes,
  getUserProfile,
  userProfileReceived,
  getOwnMemos,
  ownMemosReceived,
  getAllMemos,
  allMemosReceived
}
