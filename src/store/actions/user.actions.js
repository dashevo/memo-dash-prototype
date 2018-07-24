const UserActionTypes = {
  USER_PROFILE_RECEIVED: 'USER_PROFILE_RECEIVED',
  MEMOS_FOR_USER_RECEIVED: 'MEMOS_FOR_USER_RECEIVED',
  ALL_MEMOS_RECEIVED: 'ALL_MEMOS_RECEIVED'
}

const memoDashLib = getState => {
  const {
    root: { memoDashLib }
  } = getState()

  return memoDashLib
}

const getUserProfile = username => async (dispatch, getState) => {
  const userProfile = await memoDashLib(getState).getUserProfile(username)
  dispatch(userProfileReceived(userProfile))
}

const userProfileReceived = userProfile => ({
  type: UserActionTypes.USER_PROFILE_RECEIVED,
  payload: userProfile
})

const getMemosForUser = username => async (dispatch, getState) => {
  const memos = await memoDashLib(getState).getMemosForUser(username)
  dispatch(memosForUserReceived(username, memos))
}

const memosForUserReceived = (username, memos) => ({
  type: UserActionTypes.MEMOS_FOR_USER_RECEIVED,
  payload: { username, memos }
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
  getMemosForUser,
  memosForUserReceived,
  getAllMemos,
  allMemosReceived
}
