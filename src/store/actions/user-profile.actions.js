import { getMemoDashLib, getMissingUsers } from '../selectors'
import { userUpdated, getUsers } from './user.actions'

export const UserProfileActionTypes = {
  USER_PROFILE_RECEIVED: 'USER_PROFILE_RECEIVED'
}

export const userProfilesReceived = userProfiles => ({
  type: UserProfileActionTypes.USER_PROFILE_RECEIVED,
  payload: userProfiles
})

export const getFollowersForUser = username => async (dispatch, getState) => {
  const state = getState()
  const followers = await getMemoDashLib(state).getUserFollowers(username)

  if (followers && followers.length > 0) {
    const followerUsernames = followers.map(user => user.username)
    dispatch(userUpdated(username, { followers: followerUsernames }))

    const missingUsernames = getMissingUsers(followerUsernames)(state)
    if (missingUsernames && missingUsernames.length > 0) dispatch(getUsers(missingUsernames))
  }
}

export const getFollowingForUser = username => async (dispatch, getState) => {
  const state = getState()
  const following = await getMemoDashLib(state).getUserFollowing(username)

  if (following && following.length > 0) {
    const followingUsernames = following.map(user => user.username)
    dispatch(userUpdated(username, { following: followingUsernames }))

    const missingUsernames = getMissingUsers(followingUsernames)(state)
    if (missingUsernames && missingUsernames.length > 0) dispatch(getUsers(missingUsernames))
  }
}
