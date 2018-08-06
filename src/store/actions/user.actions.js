import { getUserByUsername, getCurrentUser } from '../selectors/users.selector'

export const UserActionTypes = {
  USER_RECEIVED: 'USER_RECEIVED',
  MEMOS_FOR_USER_RECEIVED: 'MEMOS_FOR_USER_RECEIVED',
  ALL_MEMOS_RECEIVED: 'ALL_MEMOS_RECEIVED',
  MEMO_UPDATED: 'MEMO_UPDATED',
  USER_UPDATED: 'USER_UPDATED',
  LIKE_REMOVED: 'LIKE_REMOVED'
}

const memoDashLib = getState => {
  const {
    root: { memoDashLib }
  } = getState()

  return memoDashLib
}

export const getUser = username => async (dispatch, getState) => {
  const user = await memoDashLib(getState).getUser(username)
  dispatch(userReceived(user))
}

export const userUpdated = (username, props) => ({
  type: UserActionTypes.USER_UPDATED,
  payload: { username, props }
})

export const userReceived = user => ({
  type: UserActionTypes.USER_RECEIVED,
  payload: user
})

export const getMemosForUser = username => async (dispatch, getState) => {
  const memos = await memoDashLib(getState).getMemosForUser(username)
  dispatch(userUpdated(username, { memos }))
}

export const getAllOwnLikes = () => async (dispatch, getState) => {
  const {
    user: { currentUser }
  } = getState()
  const ownLikes = await memoDashLib(getState).getAllOwnLikes()
  dispatch(userUpdated(currentUser, { ownLikes }))
}

export const getAllMemos = () => async (dispatch, getState) => {
  const memos = await memoDashLib(getState).getAllMemos()
  dispatch(allMemosReceived(memos))
}

export const allMemosReceived = memos => ({
  type: UserActionTypes.ALL_MEMOS_RECEIVED,
  payload: memos
})

export const likeMemo = (username, memoId) => async (dispatch, getState) => {
  const lib = memoDashLib(getState)
  await lib.likeMemo(username, memoId)

  const {
    user: { currentUser }
  } = getState()
  const ownLikes = await lib.getAllOwnLikes()
  dispatch(userUpdated(currentUser, { ownLikes }))

  const memo = await lib.getMemo(username, memoId)
  dispatch(memoUpdated(memo))
}

export const removeLike = (username, memoId) => async (dispatch, getState) => {
  const lib = memoDashLib(getState)

  const user = getCurrentUser(getState())
  if (user) {
    const like = user.ownLikes.find(like => like.relation.index === memoId)
    if (like) {
      await lib.removeLike(like.idx)
      await dispatch(likeRemoved(like.idx))

      const memo = await lib.getMemo(username, memoId)
      dispatch(memoUpdated(memo))
    }
  }
}

export const replyToMemo = (username, memoId, message) => async (dispatch, getState) => {
  const lib = memoDashLib(getState)
  await lib.replyToMemo(username, memoId, message)
  const memo = await lib.getMemo(username, memoId)
  dispatch(memoUpdated(memo))
}

export const likeRemoved = likeId => ({
  type: UserActionTypes.LIKE_REMOVED,
  payload: likeId
})

export const memoUpdated = memo => ({
  type: UserActionTypes.MEMO_UPDATED,
  payload: memo
})
