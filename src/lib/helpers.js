export const filterUser = (username, users) => {
  if (!users || users.length === 0) return undefined
  const filteredUsers = users.filter(user => user.username === username)
  return filteredUsers.length > 0 ? filteredUsers[0] : undefined
}
