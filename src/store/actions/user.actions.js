import { getMemoDashLib, getCurrentUsername } from '../selectors'

export const UserActionTypes = {
  USER_RECEIVED: 'USER_RECEIVED',
  USERS_RECEIVED: 'USERS_RECEIVED',
  USER_UPDATED: 'USER_UPDATED'
}

export const getAllUsers = () => async (dispatch, getState) => {
  const users = await getMemoDashLib(getState()).getAllUsers()
  dispatch(usersReceived(users))
}

export const getUsers = usernames => async (dispatch, getState) => {
  const users = await getMemoDashLib(getState()).getUsers(usernames)
  dispatch(usersReceived(users))
}

export const getUser = username => async (dispatch, getState) => {
  const user = await getMemoDashLib(getState()).getUser(username)
  await dispatch(userReceived(user))
}

export const userUpdated = (username, props) => ({
  type: UserActionTypes.USER_UPDATED,
  payload: { username, props }
})

export const userReceived = user => ({
  type: UserActionTypes.USER_RECEIVED,
  payload: user
})

export const usersReceived = users => ({
  type: UserActionTypes.USERS_RECEIVED,
  payload: users
})

export const getAllOwnLikes = () => async (dispatch, getState) => {
  const ownLikes = await getMemoDashLib(getState()).getAllOwnLikes()
  const currentUser = getCurrentUsername(getState())
  dispatch(userUpdated(currentUser, { ownLikes }))
}

export const updateProfile = bio => async (dispatch, getState) => {
  const lib = getMemoDashLib(getState())
  await lib.updateProfile(bio)
  const currentUser = getCurrentUsername(getState())
  const profile = await lib.getUserProfile(currentUser)

  await dispatch(userUpdated(currentUser, { profile }))
}
