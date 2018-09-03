import { createSelector } from 'reselect'
import { getCurrentUser, getCurrentUsername } from './user.selector'

export const getMemos = state => state.memo.memos

export const getMemoByCombinedId = memoId =>
  createSelector([getMemos], memos => (memos ? memos[memoId] : undefined))

export const getMemosByCombinedIds = memoIds =>
  createSelector([getMemos], memos => (memoIds && memos ? memoIds.map(memoId => memos[memoId]) : undefined))

export const isMemoOfCurrentUser = memo =>
  createSelector(
    [getCurrentUsername],
    currentUserName => (memo ? currentUserName === memo.username : undefined)
  )

export const isMemoLikedByCurrentUser = memo =>
  createSelector([getCurrentUser], currentUser => {
    return currentUser && currentUser.ownLikes && memo.username !== currentUser.username
      ? currentUser.ownLikes.some(
          like => like.relation.username === memo.username && like.relation.index === memo.idx
        )
      : false
  })
