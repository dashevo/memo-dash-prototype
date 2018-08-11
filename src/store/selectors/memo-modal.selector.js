import { createSelector } from 'reselect'
import { getMemos } from './memo.selector'

export const isMemoModalOpened = state => Boolean(state.memoModal.opened)

const openedMemoSelector = state => state.memoModal.openedMemo

export const getOpenedMemo = createSelector(
  [openedMemoSelector, getMemos],
  (openedMemo, memos) => (memos ? memos[openedMemo] : undefined)
)
