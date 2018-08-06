import { createSelector } from 'reselect'
import { getCurrentUser, getCurrentUsername } from './user.selector'

export const getMemos = state => state.memo.memos

export const getMemoByCombinedId = memoId =>
  createSelector([getMemos], memos => (memos ? memos[memoId] : undefined))

export const getMemosByCombinedIds = memoIds =>
  createSelector([getMemos], memos => (memoIds && memos ? memoIds.map(memoId => memos[memoId]) : undefined))

export const isMemoOfCurrentUser = memo =>
  createSelector([getCurrentUsername], currentUserName => currentUserName === memo.username)

export const isMemoLikedByCurrentUser = memo =>
  createSelector(
    [getCurrentUser],
    currentUser =>
      currentUser && memo.username !== currentUser.username && currentUser.ownLikes
        ? currentUser.ownLikes.some(like => like.relation.index === memo.idx)
        : false
  )
