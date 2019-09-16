import { createSelector } from "reselect"
import { getCurrentUser, getCurrentUserName } from "./user.selector"

export const getMemos = state => state.memo.memos

export const getMemoByScopeId = scopeId =>
  createSelector([getMemos], memos => (memos ? memos[scopeId] : undefined))

export const getMemosByCombinedIds = memoIds =>
  createSelector(
    [getMemos],
    memos =>
      memoIds && memos ? memoIds.map(memoId => memos[memoId]) : undefined
  )

export const isMemoOfCurrentUser = memo =>
  createSelector(
    [getCurrentUser],
    currentUser =>
      memo
        ? currentUser && currentUser.regtxid === memo.$meta.userId
        : undefined
  )

export const isMemoLikedByCurrentUser = memo =>
  createSelector([getCurrentUser], currentUser => {
    return currentUser &&
      currentUser.likes &&
      memo.username !== currentUser.username
      ? currentUser.likes.some(
          like =>
            like.relation.username === memo.username &&
            like.relation.index === memo.idx
        )
      : false
  })

export const getLikesOfMissingMemos = likes =>
  createSelector([getMemos], availableMemos =>
    likes
      .filter((like, index, self) => self.indexOf(like) === index)
      .filter(like => !availableMemos[like.relation.$scopeId])
  )
