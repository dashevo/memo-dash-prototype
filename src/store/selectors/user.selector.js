import { createSelector } from 'reselect'

import { getMemos } from './memo.selector'

const userSelector = state => state.user.users

export const isAuthenticated = state => Boolean(getCurrentUser(state))
export const getCurrentUsername = state => state.user.currentUser

export const getCurrentUser = createSelector([getCurrentUsername, userSelector], (currentUser, users) => {
  return users ? users[currentUser] : undefined
})

export const getUserByUsername = username => {
  return createSelector(userSelector, users => users[username])
}

export const getAvatarUrl = username =>
  createSelector([userSelector], users => {
    const user = users[username]
    return user && user.profile ? user.profile.avatarUrl : undefined
  })

export const getUserProfile = username =>
  createSelector([getUserByUsername(username)], user => {
    return user ? user.profile : undefined
  })

export const getUserMemos = username =>
  createSelector([getUserByUsername(username), getMemos], (user, memos) => {
    return user && user.memoIds ? user.memoIds.map(memoId => memos[memoId]) : undefined
  })

export const getUserFollowers = username =>
  createSelector([getUserByUsername(username), userSelector], (user, users) => {
    return user && user.followers ? user.followers.map(follower => users[follower]) : undefined
  })

export const getUserFollowing = username =>
  createSelector([getUserByUsername(username), userSelector], (user, users) => {
    return user && user.following ? user.following.map(following => users[following]) : undefined
  })

export const getMissingUsers = usernames =>
  createSelector([userSelector], availableUsers =>
    usernames
      .filter((username, index, self) => self.indexOf(username) === index)
      .filter(username => !availableUsers[username])
  )
