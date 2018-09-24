import {
  getMemoDashLib,
  getMissingUsers,
  getUserFollowers,
  getUserFollowing,
  getCurrentUsername,
  getUserLikes,
  getMemosByCombinedIds,
  getLikesOfMissingMemos
} from '../selectors'
import { getUsers } from './user.actions'
import { getMemos } from './memo.actions'
import { combineMemoId } from '../reducers/memo.reducer'

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

export const getLikedMemosForUser = username => async (dispatch, getState) => {
  const state = getState()
  const likes = getUserLikes(username)(state)

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

    return getMemosByCombinedIds(
      likes.map(like => combineMemoId(like.relation.username, like.relation.index))
    )(state)
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
