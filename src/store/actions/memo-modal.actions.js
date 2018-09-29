import { getMemoByCombinedId } from '../selectors'

export const MemoModalActionTypes = {
  OPEN_MODAL: 'OPEN_MODAL',
  CLOSE_MODAL: 'CLOSE_MODAL'
}

export const openMemoModalByCombinedId = memoId => async (dispatch, getState) => {
  const memo = getMemoByCombinedId(memoId)(getState())
  dispatch(openMemoModal(memo))
}

export const openMemoModal = memo => ({
  type: MemoModalActionTypes.OPEN_MODAL,
  payload: memo
})

export const closeMemoModal = () => ({
  type: MemoModalActionTypes.CLOSE_MODAL
})
