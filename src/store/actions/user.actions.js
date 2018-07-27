export const UserActionTypes = {
  MEMOS_FOR_USER_RECEIVED: 'MEMOS_FOR_USER_RECEIVED',
  ALL_MEMOS_RECEIVED: 'ALL_MEMOS_RECEIVED'
}

const memoDashLib = getState => {
  const {
    root: { memoDashLib }
  } = getState()

  return memoDashLib
}

export const getUser = username => async (dispatch, getState) => {
  const user = await memoDashLib(getState).getUser(username)
  dispatch(userReceived(user))
}

const userProfileReceived = userProfile => ({
  type: UserActionTypes.USER_PROFILE_RECEIVED,
  payload: userProfile
})

export const userReceived = user => ({
  type: UserActionTypes.USER_RECEIVED,
  payload: user
})

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
