import {
  getMemoDashLib,
  getCurrentUser,
  getMissingUsers,
  getCurrentUserId
} from "../selectors"
import { userUpdated, getUsers } from "./user.actions"

export const MemoActionTypes = {
  MEMOS_RECEIVED: "MEMOS_RECEIVED",
  MEMO_UPDATED: "MEMO_UPDATED",
  MEMO_REPLIES_RECEIVED: "MEMO_REPLIES_RECEIVED",
  LIKE_REMOVED: "LIKE_REMOVED",
  LIKE_ADDED: "LIKE_ADDED",
  MEMO_DELETED: "MEMO_DELETED"
}

export const getMemosForUser = (userId, limit) => async (
  dispatch,
  getState
) => {
  const lib = getMemoDashLib(getState())
  const memos = await lib.getMemosForUser(userId, limit)

  if (memos) {
    dispatch(memosReceived(memos))
    dispatch(userUpdated(userId, { memoIds: memos.map(memo => memo.$scopeId) }))
  }
}

export const getMemos = memoIds => async (dispatch, getState) => {
  const state = getState()

  const memos = await getMemoDashLib(state).getMemos(memoIds)

  if (memos) {
    dispatch(memosReceived(memos))
    const userIds = getMissingUsers(memos.map(memo => memo.$meta.userId))(state)

    if (userIds && userIds.length > 0) {
      dispatch(getUsers(userIds))
    }
  }
}

export const memosReceived = memos => ({
  type: MemoActionTypes.MEMOS_RECEIVED,
  payload: memos
})

export const likeMemo = (username, memoId) => async (dispatch, getState) => {
  const lib = getMemoDashLib(getState())
  await lib.likeMemo(username, memoId)

  const currentUsername = getCurrentUserId(getState())
  const likes = await lib.getUserLikes(currentUsername)

  await dispatch(likeAdded(likes))

  const memo = await lib.getMemo(username, memoId)
  dispatch(memoUpdated(memo))
}

export const removeLike = (username, memoId) => async (dispatch, getState) => {
  const lib = getMemoDashLib(getState())
  const currentUser = getCurrentUser(getState())

  if (currentUser) {
    const like = currentUser.likes.find(like => like.relation.index === memoId)
    if (like) {
      await lib.removeLike(like.idx)
      await dispatch(likeRemoved(like.idx))

      const memo = await lib.getMemo(username, memoId)
      dispatch(memoUpdated(memo))
    }
  }
}

export const likeAdded = likeId => ({
  type: MemoActionTypes.LIKE_ADDED,
  payload: likeId
})

export const likeRemoved = likeId => ({
  type: MemoActionTypes.LIKE_REMOVED,
  payload: likeId
})

export const replyToMemo = (userId, memoId, message) => async (
  dispatch,
  getState
) => {
  const lib = getMemoDashLib(getState())
  await lib.replyToMemo(userId, memoId, message)
  const memo = await lib.getMemo(userId, memoId)
  dispatch(memoUpdated(memo))
  dispatch(getMemoReplies(userId, memoId))

  const currentUserId = getCurrentUserId(getState())
  dispatch(getMemosForUser(currentUserId))
}

export const memoUpdated = memo => ({
  type: MemoActionTypes.MEMO_UPDATED,
  payload: memo
})

export const getMemoReplies = (username, memoId) => async (
  dispatch,
  getState
) => {
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

export const deleteMemo = memoId => async (dispatch, getState) => {
  const lib = getMemoDashLib(getState())
  await lib.deleteMemo(memoId)
  dispatch(memoDeleted(memoId))
}

export const memoDeleted = memoId => ({
  type: MemoActionTypes.MEMO_DELETED,
  payload: memoId
})

export const editMemo = (userId, memoId, message) => async (
  dispatch,
  getState
) => {
  const lib = getMemoDashLib(getState())
  await lib.editMemo(memoId, message)
  const memo = await lib.getMemo(userId, memoId)
  dispatch(memoUpdated(memo))
}
