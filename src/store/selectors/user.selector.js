import { createSelector } from 'reselect'

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
  createSelector([getUserByUsername(username)], user => {
    return user ? user.memos : undefined
  })

export const getMissingUsers = usernames =>
  createSelector([userSelector], availableUsers =>
    usernames
      .filter((username, index, self) => self.indexOf(username) === index)
      .filter(username => !availableUsers[username])
  )
