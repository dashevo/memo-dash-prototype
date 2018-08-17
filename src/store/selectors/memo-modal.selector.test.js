import * as selector from './memo-modal.selector'
import testUsers from '../../test-utils/test-users'
import { combineMemoId } from '../reducers/memo.reducer'

describe('memo-modal selector', () => {
  const alice = testUsers['alice']

  const state = {
    memoModal: {
      opened: true,
      openedMemo: combineMemoId(alice.memos[0].username, alice.memos[0].idx)
    },
    memo: {
      memos: {
        [combineMemoId(alice.memos[0].username, alice.memos[0].idx)]: alice.memos[0]
      }
    }
  }

  it('should return true if memo modal is opened', () => {
    expect(selector.isMemoModalOpened(state)).toEqual(true)
  })

  it('should return false if memo modal is opened', () => {
    const changedState = { ...state, memoModal: { ...state.memoModal, opened: false } }
    expect(selector.isMemoModalOpened(changedState)).toEqual(false)
  })

  it('should return opened memo', () => {
    expect(selector.getOpenedMemo(state)).toEqual(alice.memos[0])
  })
})
