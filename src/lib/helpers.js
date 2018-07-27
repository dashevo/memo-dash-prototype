export const filterUser = (username, users) => {
  if (!users || users.length === 0) return undefined
  return users.find(user => user.username === username)
}

export const isMemoLikedByUsername = (memo, username, users) => {
  const currentUser = filterUser(username, users)
  if (!currentUser) return false

  return currentUser.ownLikes.some(like => memo.username !== username && like.relation.index === memo.idx)
}
