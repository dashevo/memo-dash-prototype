import { createSelector } from "reselect"

import { getMemos } from "./memo.selector"

export const getUsers = state => state.user.users
export const getProfiles = state => state.user.profiles

export const isAuthenticated = state => Boolean(getCurrentUser(state))
export const getCurrentUserName = state => state.user.currentUser

export const getCurrentUser = createSelector(
  [getCurrentUserName, getUsers],
  (currentUser, users) => {
    return users ? users[currentUser] : undefined
  }
)

export const getUserByUserName = username => {
  return createSelector(getUsers, users => users[username])
}

export const getUserByUserId = userId => {
  return createSelector(getUsers, users =>
    Object.values(users).find(user => user.regtxid === userId)
  )
}

export const getUserProfile = username =>
  createSelector(getProfiles, profiles => profiles[username])

export const getUserProfileByUserName = username =>
  createSelector(getProfiles, profiles => profiles[username])

export const getUserIdByUserName = username =>
  createSelector([getUserByUserName(username)], user => user.regtxid)

export const getAvatarUrl = username =>
  createSelector([getUserProfile(username)], profile => {
    return profile ? profile.avatarUrl : undefined
  })

export const getUserMemos = userId =>
  createSelector([getMemos], memos => {
    return memos
      ? Object.values(memos).filter(memo => memo.$meta.userId === userId)
      : undefined
  })

export const getUserFollowers = userId =>
  createSelector([getUserByUserId(userId), getUsers], (user, users) => {
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
          obj[like.relation.$scopeId] = memos[like.relation.$scopeId]
          return obj
        }, {})
      : undefined
  })

export const getMissingUsers = usernames =>
  createSelector([getUsers], availableUsers =>
    usernames
      .filter((usernames, index, self) => self.indexOf(usernames) === index)
      .filter(username => !availableUsers[username])
  )

export const amIFollowing = username =>
  createSelector([getCurrentUser], currentUser => {
    return currentUser.following
      ? currentUser.following.some(following => following === username)
      : undefined
  })

export const isProfileOfCurrentUser = userProfile =>
  createSelector([getCurrentUser], currentUser => {
    return userProfile.$meta.userId === currentUser.regtxid
  })
