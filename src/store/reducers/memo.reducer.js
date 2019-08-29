import { getMemoByScopeId } from "../selectors/memo.selector"
import { MemoActionTypes } from "../actions"

export const combineMemoId = (username, memoId) => `[${username}][${memoId}]`

export const initialState = {
  memos: undefined
}

export default (state = initialState, action) => {
  switch (action.type) {
    case MemoActionTypes.MEMO_UPDATED: {
      const { $scopeId } = action.payload
      const memos = { ...state.memos }

      memos[$scopeId] = { ...memos[$scopeId], ...action.payload }

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
          receivedMemo => (memos[receivedMemo.$scopeId] = receivedMemo)
        )

        return {
          ...state,
          memos
        }
      }
      return state
    }

    case MemoActionTypes.MEMO_REPLIES_RECEIVED: {
      const { $scopeId, replies } = action.payload

      const replyIds = []
      const memos = { ...state.memos }

      if (replies) {
        replies.forEach(reply => {
          memos[reply.$scopeId] = { ...memos[reply.$scopeId], ...reply }
          replyIds.push(reply.$scopeId)
        })

        const memo = getMemoByScopeId($scopeId)({
          memo: state
        })
        memos[$scopeId] = { ...memo, replyIds }

        return {
          ...state,
          memos
        }
      }
      return state
    }
    case MemoActionTypes.MEMO_DELETED: {
      const memos = { ...state.memos }

      if (memos && memos[action.payload]) {
        delete memos[action.payload]
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
