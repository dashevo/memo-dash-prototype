import { createSelector } from 'reselect'

export const isMemoModalOpened = state => Boolean(state.memoModal.opened)

const openedMemoSelector = state => state.memoModal.openedMemo
const getMemos = state => state.memo.memos

export const getOpenedMemo = createSelector(
  [openedMemoSelector, getMemos],
  (openedMemo, memos) => (memos ? memos[openedMemo] : undefined)
)
