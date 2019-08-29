import { MemoModalActionTypes } from "../actions/memo-modal.actions"

export const initialState = {
  opened: false,
  openedMemo: undefined
}

export default (state = initialState, action) => {
  switch (action.type) {
    case MemoModalActionTypes.OPEN_MODAL: {
      const memo = action.payload
      return {
        ...state,
        openedMemo: memo.$scopeId,
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
