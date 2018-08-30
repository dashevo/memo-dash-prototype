import {
  getMemoDashLib,
  getMissingUsers,
  getUserFollowers,
  getUserFollowing,
  getCurrentUsername
} from '../selectors'
import { getUsers } from './user.actions'

export const getFollowersForUser = username => async (dispatch, getState) => {
  const state = getState()
  const followers = getUserFollowers(username)(state)

  if (followers && followers.length > 0) {
    const missingUsernames = getMissingUsers(followers)(state)
    if (missingUsernames && missingUsernames.length > 0) dispatch(getUsers(missingUsernames))
  }
}

export const getFollowingForUser = username => async (dispatch, getState) => {
  const state = getState()
  const following = getUserFollowing(username)(state)

  if (following && following.length > 0) {
    const missingUsernames = getMissingUsers(following)(state)
    if (missingUsernames && missingUsernames.length > 0) dispatch(getUsers(missingUsernames))
  }
}

export const followUser = username => async (dispatch, getState) => {
  await getMemoDashLib(getState()).followUser(username)
  dispatch(getUsers([username, getCurrentUsername(getState())]))
}

export const unFollowUser = username => async (dispatch, getState) => {
  await getMemoDashLib(getState()).unFollowUser(username)
  dispatch(getUsers([username, getCurrentUsername(getState())]))
}
