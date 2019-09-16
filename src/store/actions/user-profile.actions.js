import {
  getMemoDashLib,
  getMissingUsers,
  getUserFollowers,
  getUserFollowing,
  getCurrentUserName,
  getUserLikes,
  getMemosByCombinedIds,
  getLikesOfMissingMemos
} from "../selectors"
import { getUsers } from "./user.actions"
import { getMemos } from "./memo.actions"

export const getFollowersForUser = userId => async (dispatch, getState) => {
  const state = getState()
  const followers = getUserFollowers(userId)(state)

  if (followers && followers.length > 0) {
    const missingUserIds = getMissingUsers(followers)(state)
    if (missingUserIds && missingUserIds.length > 0)
      dispatch(getUsers(missingUserIds))
  }
}

export const getFollowingForUser = userId => async (dispatch, getState) => {
  const state = getState()
  const following = getUserFollowing(userId)(state)

  if (following && following.length > 0) {
    const missingUsernames = getMissingUsers(following)(state)
    if (missingUsernames && missingUsernames.length > 0)
      dispatch(getUsers(missingUsernames))
  }
}

export const getLikedMemosForUser = userId => async (dispatch, getState) => {
  const state = getState()
  const likes = getUserLikes(userId)(state)

  if (likes && likes.length > 0) {
    const likesOfMissingMemos = getLikesOfMissingMemos(likes)(state)

    if (likesOfMissingMemos && likesOfMissingMemos.length > 0)
      await dispatch(
        getMemos(
          likesOfMissingMemos.map(like => {
            return {
              username: like.relation.username,
              idx: like.relation.index
            }
          })
        )
      )

    return getMemosByCombinedIds(likes.map(like => like.relation.$scopeId))(
      state
    )
  }
}

export const followUser = userId => async (dispatch, getState) => {
  await getMemoDashLib(getState()).followUser(userId)
  dispatch(getUsers([username, getCurrentUserName(getState())]))
}

export const unFollowUser = username => async (dispatch, getState) => {
  await getMemoDashLib(getState()).unFollowUser(username)
  dispatch(getUsers([username, getCurrentUserName(getState())]))
}
