import { getMemoByCombinedId } from '../selectors/memo.selector'
import { MemoActionTypes } from '../actions'

export const combineMemoId = (username, memoId) => `[${username}][${memoId}]`

export const initialState = {
  memos: undefined
}

export default (state = initialState, action) => {
  switch (action.type) {
    case MemoActionTypes.MEMO_UPDATED: {
      const { username, idx } = action.payload
      const combinedMemoId = combineMemoId(username, idx)
      const memos = { ...state.memos }

      memos[combinedMemoId] = { ...memos[combinedMemoId], ...action.payload }

      return {
        ...state,
        memos
      }
    }
    case MemoActionTypes.MEMOS_RECEIVED: {
      const memos = { ...state.memos }
      const receivedMemos = action.payload

      if (receivedMemos) {
        receivedMemos.forEach(
          receivedMemo => (memos[combineMemoId(receivedMemo.username, receivedMemo.idx)] = receivedMemo)
        )

        return {
          ...state,
          memos
        }
      }
      return state
    }

    case MemoActionTypes.MEMO_REPLIES_RECEIVED: {
      const { username, memoId, replies } = action.payload

      const replyIds = []
      const memos = { ...state.memos }

      if (replies) {
        replies.forEach(reply => {
          const combinedMemoId = combineMemoId(reply.username, reply.idx)
          memos[combinedMemoId] = { ...memos[combinedMemoId], ...reply }
          replyIds.push(combinedMemoId)
        })

        const memo = getMemoByCombinedId(combineMemoId(username, memoId))({ memo: state })
        memos[combineMemoId(username, memoId)] = { ...memo, replyIds }

        return {
          ...state,
          memos
        }
      }
      return state
    }
    default:
      return state
  }
}
