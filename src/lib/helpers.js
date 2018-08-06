import { getUserByUsername } from '../store/selectors/users.selector'

export const isMemoLikedByUsername = (memo, username, users) => {
  const currentUser = getUserByUsername(username)()
  if (!currentUser) return false

  return currentUser.ownLikes.some(like => memo.username !== username && like.relation.index === memo.idx)
}
