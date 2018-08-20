import { getMemoDashLib, getCurrentUser, getMissingUsers, getCurrentUsername } from '../selectors'
import { userUpdated, getUsers } from './user.actions'
import { combineMemoId } from '../reducers/memo.reducer'

export const MemoActionTypes = {
  MEMOS_RECEIVED: 'MEMOS_RECEIVED',
  MEMO_UPDATED: 'MEMO_UPDATED',
  MEMO_REPLIES_RECEIVED: 'MEMO_REPLIES_RECEIVED',
  LIKE_REMOVED: 'LIKE_REMOVED'
}

export const getMemosForUser = username => async (dispatch, getState) => {
  const memos = await getMemoDashLib(getState()).getMemosForUser(username)

  if (memos) {
    dispatch(memosReceived(memos))
    const memoIds = memos.map(memo => combineMemoId(memo.username, memo.idx))
    dispatch(userUpdated(username, { memoIds }))
  }
}

export const getMemos = () => async (dispatch, getState) => {
  const state = getState()

  const memos = await getMemoDashLib(state).getMemos()

  if (memos) {
    dispatch(memosReceived(memos))
    const usernames = getMissingUsers(memos.map(memo => memo.username))(state)
    dispatch(getUsers(usernames))
  }
}

export const memosReceived = memos => ({
  type: MemoActionTypes.MEMOS_RECEIVED,
  payload: memos
})

export const likeMemo = (username, memoId) => async (dispatch, getState) => {
  const lib = getMemoDashLib(getState())
  await lib.likeMemo(username, memoId)

  const currentUser = getCurrentUsername(getState())
  const ownLikes = await lib.getAllOwnLikes()
  dispatch(userUpdated(currentUser, { ownLikes }))

  const memo = await lib.getMemo(username, memoId)
  dispatch(memoUpdated(memo))
}

export const removeLike = (username, memoId) => async (dispatch, getState) => {
  const lib = getMemoDashLib(getState())
  const currentUser = getCurrentUser(getState())

  if (currentUser) {
    const like = currentUser.ownLikes.find(like => like.relation.index === memoId)
    if (like) {
      await lib.removeLike(like.idx)
      await dispatch(likeRemoved(like.idx))

      const memo = await lib.getMemo(username, memoId)
      dispatch(memoUpdated(memo))
    }
  }
}

export const likeRemoved = likeId => ({
  type: MemoActionTypes.LIKE_REMOVED,
  payload: likeId
})

export const replyToMemo = (username, memoId, message) => async (dispatch, getState) => {
  const lib = getMemoDashLib(getState())
  await lib.replyToMemo(username, memoId, message)
  const memo = await lib.getMemo(username, memoId)
  dispatch(memoUpdated(memo))
  dispatch(getMemoReplies(username, memoId))
}

export const memoUpdated = memo => ({
  type: MemoActionTypes.MEMO_UPDATED,
  payload: memo
})

export const getMemoReplies = (username, memoId) => async (dispatch, getState) => {
  const lib = getMemoDashLib(getState())
  const replies = await lib.getMemoReplies(username, memoId)

  dispatch(memoRepliesReceived(username, memoId, replies))
}

export const memoRepliesReceived = (username, memoId, replies) => ({
  type: MemoActionTypes.MEMO_REPLIES_RECEIVED,
  payload: { username, memoId, replies }
})

export const postMemo = message => async (dispatch, getState) => {
  const lib = getMemoDashLib(getState())
  await lib.postMemo(message)
  dispatch(getMemos())
}
