import { createSelector } from 'reselect'

const currentUserSelector = state => state.user.currentUser
const userSelector = state => state.user.users

export const isAuthenticated = state => Boolean(getCurrentUser(state))
export const getCurrentUsername = state => state.user.currentUser

export const getAvatarUrl = username =>
  createSelector([userSelector], users => {
    const user = users[username]
    return user && user.profile ? user.profile.avatarUrl : undefined
  })

export const getCurrentUser = createSelector([currentUserSelector, userSelector], (currentUser, users) => {
  return users ? users[currentUser] : undefined
})

export const getUserByUsername = username =>
  createSelector([userSelector], users => {
    return users[username]
  })

export const getMissingUsers = users =>
  createSelector([userSelector], availableUsers => {
    return users
      .filter((username, index, self) => self.indexOf(username) === index)
      .filter(username => !availableUsers[username])
  })
