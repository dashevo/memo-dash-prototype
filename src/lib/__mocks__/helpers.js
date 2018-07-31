import testUsers from '../../test-utils/test-users'

export const filterUser = (username, users) => testUsers.find(testUser => testUser.username === username)

export const isMemoLikedByUsername = (memo, username, users) => {
  return false
}
