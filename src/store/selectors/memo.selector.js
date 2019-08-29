import { createSelector } from "reselect"
import { getCurrentUser, getCurrentUserId } from "./user.selector"
import { combineMemoId } from "../reducers/memo.reducer"

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
    [getCurrentUserId],
    currentUserId => (memo ? currentUserId === memo.$meta.userId : undefined)
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
      .filter(
        like =>
          !availableMemos[
            combineMemoId(like.relation.username, like.relation.index)
          ]
      )
  )
