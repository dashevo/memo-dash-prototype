import { createSelector } from "reselect"

import { getMemos } from "./memo.selector"
import { combineMemoId } from "../reducers/memo.reducer"

export const getUsers = state => state.user.users
export const getProfiles = state => state.user.profiles

export const isAuthenticated = state => Boolean(getCurrentUser(state))
export const getCurrentUserId = state => state.user.currentUser

export const getCurrentUser = createSelector(
  [getCurrentUserId, getUsers],
  (currentUser, users) => {
    return users ? users[currentUser] : undefined
  }
)

export const getUserByUserId = userId => {
  return createSelector(getUsers, users => users[userId])
}

export const getUserByUserName = username => {
  return createSelector(getUsers, users =>
    Object.values(users).find(user => user.uname === username)
  )
}

export const getUserProfile = userId =>
  createSelector(getProfiles, profiles => profiles[userId])

export const getUserProfileByUserName = username =>
  createSelector(
    [getProfiles, getUserByUserName(username)],
    (profiles, user) => profiles[user.regtxid]
  )

export const getUserIdByUserName = username =>
  createSelector([getUserByUserName(username)], user => user.regtxid)

export const getAvatarUrl = userId =>
  createSelector([getUserProfile(userId)], profile => {
    return profile ? profile.avatarUrl : undefined
  })

export const getUserMemos = userId =>
  createSelector([getMemos], memos => {
    return memos
      ? Object.values(memos).filter(memo => memo.$meta.userId === userId)
      : undefined
  })

export const getUserFollowers = username =>
  createSelector([getUserByUsername(username), getUsers], (user, users) => {
    return user && user.followers
      ? user.followers.map(follower => users[follower])
      : undefined
  })

export const getUserFollowing = username =>
  createSelector([getUserByUsername(username), getUsers], (user, users) => {
    return user && user.following
      ? user.following.map(following => users[following])
      : undefined
  })

export const getUserLikes = username =>
  createSelector([getUserByUsername(username)], user => {
    return user ? user.likes : undefined
  })

export const getUserLikedMemos = username =>
  createSelector([getUserByUsername(username), getMemos], (user, memos) => {
    return user && user.likes
      ? user.likes.reduce((obj, like) => {
          const combinedMemoId = combineMemoId(
            like.relation.username,
            like.relation.index
          )
          obj[combinedMemoId] = memos[combinedMemoId]
          return obj
        }, {})
      : undefined
  })

export const getMissingUsers = userIds =>
  createSelector([getUsers], availableUsers =>
    userIds
      .filter((userId, index, self) => self.indexOf(userId) === index)
      .filter(userId => !availableUsers[userId])
  )

export const amIFollowing = username =>
  createSelector([getCurrentUser], currentUser => {
    return currentUser.following
      ? currentUser.following.some(following => following === username)
      : undefined
  })

export const isProfileOfCurrentUser = userProfile =>
  createSelector([getCurrentUserId], currentUser => {
    return userProfile.$meta.userId === currentUser
  })
