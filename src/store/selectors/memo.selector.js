import { createSelector } from 'reselect'
import { getCurrentUser, getCurrentUsername } from './user.selector'
import { combineMemoId } from '../reducers/memo.reducer'

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
    return currentUser && currentUser.likes && memo.username !== currentUser.username
      ? currentUser.likes.some(
          like => like.relation.username === memo.username && like.relation.index === memo.idx
        )
      : false
  })

export const getLikesOfMissingMemos = likes =>
  createSelector([getMemos], availableMemos =>
    likes
      .filter((like, index, self) => self.indexOf(like) === index)
      .filter(like => !availableMemos[combineMemoId(like.relation.username, like.relation.index)])
  )
