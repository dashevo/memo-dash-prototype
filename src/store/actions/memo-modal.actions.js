import { getMemoByScopeId } from "../selectors"

export const MemoModalActionTypes = {
  OPEN_MODAL: "OPEN_MODAL",
  CLOSE_MODAL: "CLOSE_MODAL"
}

export const openMemoModalByCombinedId = scopeId => async (
  dispatch,
  getState
) => {
  const memo = getMemoByScopeId(scopeId)(getState())
  dispatch(openMemoModal(memo))
}

export const openMemoModal = memo => ({
  type: MemoModalActionTypes.OPEN_MODAL,
  payload: memo
})

export const closeMemoModal = () => ({
  type: MemoModalActionTypes.CLOSE_MODAL
})
