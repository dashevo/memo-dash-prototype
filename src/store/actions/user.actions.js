import { getMemoDashLib, getCurrentUsername } from '../selectors'

export const UserActionTypes = {
  USER_RECEIVED: 'USER_RECEIVED',
  USERS_RECEIVED: 'USERS_RECEIVED',
  USER_UPDATED: 'USER_UPDATED',
  LIKE_REMOVED: 'LIKE_REMOVED'
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
  dispatch(userReceived(user))
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
