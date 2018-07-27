import testUsers from '../../test-utils/test-users'

export const filterUser = (username, users) => testUsers.find(testUser => testUser.username === username)
