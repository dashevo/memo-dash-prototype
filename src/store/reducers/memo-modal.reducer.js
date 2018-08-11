import { MemoModalActionTypes } from '../actions/memo-modal.actions'

export const initialState = {
  opened: false,
  openedMemo: undefined
}

const combineMemoId = (username, memoId) => `[${username}][${memoId}]`

export default (state = initialState, action) => {
  switch (action.type) {
    case MemoModalActionTypes.OPEN_MODAL: {
      const memo = action.payload
      const combinedMemoId = combineMemoId(memo.username, memo.idx)
      return {
        ...state,
        openedMemo: combinedMemoId,
        opened: true
      }
    }
    case MemoModalActionTypes.CLOSE_MODAL:
      return {
        ...state,
        opened: false
      }
    default:
      return state
  }
}
