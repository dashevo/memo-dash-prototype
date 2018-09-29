import * as memoModalActions from './memo-modal.actions'
import { MemoModalActionTypes } from './memo-modal.actions'
import { verifyAction, mockStoreAndDispatch, getAction } from '../../test-utils/actions.test-helper'

import * as memoSelectors from '../selectors/memo.selector'

describe('memo-modal actions', () => {
  describe('should create an action', () => {
    it('to indicate that a memo should be opened in modal dialog', () => {
      verifyAction(MemoModalActionTypes.OPEN_MODAL, 'memo', () => memoModalActions.openMemoModal('memo'))
    })

    it('to indicate that the memo modal dialog should be closed', () => {
      verifyAction(MemoModalActionTypes.CLOSE_MODAL, undefined, () => memoModalActions.closeMemoModal())
    })
  })

  describe('when dispatching action', () => {
    describe('openMemoModalByCombinedId(memoId)', () => {
      it('should call memoSelectors', async () => {
        memoSelectors.getMemoByCombinedId = jest.fn(() => jest.fn())
        await mockStoreAndDispatch({}, memoModalActions.openMemoModalByCombinedId('memoId'))
        expect(memoSelectors.getMemoByCombinedId).toHaveBeenCalledWith('memoId')
      })

      it('should dispatch openMemoModal', async () => {
        memoSelectors.getMemoByCombinedId = jest.fn(() => jest.fn().mockReturnValue('memo'))
        const actions = await mockStoreAndDispatch({}, memoModalActions.openMemoModalByCombinedId('memoId'))
        expect(await getAction(actions, MemoModalActionTypes.OPEN_MODAL)).toEqual(
          memoModalActions.openMemoModal('memo')
        )
      })
    })
  })
})
