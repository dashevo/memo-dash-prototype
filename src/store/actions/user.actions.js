import { getMemoDashLib, getCurrentUserId } from "../selectors"

export const UserActionTypes = {
  USER_RECEIVED: "USER_RECEIVED",
  USERS_RECEIVED: "USERS_RECEIVED",
  USER_UPDATED: "USER_UPDATED",
  USER_PROFILE_RECEIVED: "USER_PROFILE_RECEIVED"
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
  const memoDashLib = getMemoDashLib(getState())

  if (memoDashLib) {
    const user = await memoDashLib.getUser(username)
    await dispatch(userReceived(user))
  }
}

export const getUserProfile = userId => async (dispatch, getState) => {
  const memoDashLib = getMemoDashLib(getState())

  if (memoDashLib) {
    const profile = await memoDashLib.getUserProfile(userId)
    await dispatch(userProfileReceived(profile))
  }
}

export const userUpdated = (userId, props) => ({
  type: UserActionTypes.USER_UPDATED,
  payload: { username: userId, props }
})

export const userReceived = user => ({
  type: UserActionTypes.USER_RECEIVED,
  payload: user
})

export const userProfileReceived = profile => ({
  type: UserActionTypes.USER_PROFILE_RECEIVED,
  payload: profile
})

export const usersReceived = users => ({
  type: UserActionTypes.USERS_RECEIVED,
  payload: users
})

export const updateProfile = bio => async (dispatch, getState) => {
  const lib = getMemoDashLib(getState())
  await lib.updateProfile(bio)
  const currentUserId = getCurrentUserId(getState())
  const profile = await lib.getUserProfile(currentUserId)

  await dispatch(userUpdated(currentUserId, { profile }))
}
