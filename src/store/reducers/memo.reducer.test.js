import reducer, { initialState, combineMemoId } from './memo.reducer'
import { memosReceived, memoUpdated, memoRepliesReceived, memoDeleted } from '../actions/memo.actions'
import { testUsers, testMemos } from '../../test-utils/test-data'

describe('memo reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  describe('not relevant actions', () => {
    it('should return unchanged state', () => {
      const state = {}
      expect(reducer(state, {})).toBe(state)
    })
  })

  describe('relevant actions', () => {
    let memo
    beforeEach(() => {
      memo = testMemos['[alice][1]']
    })

    describe('Memos', () => {
      describe('should handle MEMOS_RECEIVED', () => {
        it('should add received memos to the state', () => {
          expect(reducer(undefined, memosReceived([memo]))).toEqual({
            ...initialState,
            memos: { ['[alice][1]']: memo }
          })
        })

        it('should return original state when received undefined', () => {
          expect(reducer(undefined, memosReceived(undefined))).toEqual(initialState)
        })
      })

      it('should handle MEMO_UPDATED', () => {
        const updatedMemo = { ...memo, memoLikesCount: 1 }
        const state = {
          ...initialState,
          memos: { [combineMemoId(memo.username, memo.idx)]: memo }
        }

        expect(reducer(state, memoUpdated(updatedMemo))).toEqual({
          ...initialState,
          memos: {
            [combineMemoId(updatedMemo.username, updatedMemo.idx)]: { ...updatedMemo }
          }
        })
      })
      describe('should handle MEMO_REPLIES_RECEIVED', () => {
        it('should add received replies to the state', () => {
          const replies = [testMemos['[bob][1]']]
          const replyId = combineMemoId(replies[0].username, replies[0].idx)
          const state = {
            ...initialState,
            memos: { [combineMemoId(memo.username, memo.idx)]: memo }
          }

          expect(reducer(state, memoRepliesReceived(memo.username, memo.idx, replies))).toEqual({
            ...initialState,
            memos: {
              [combineMemoId(memo.username, memo.idx)]: {
                ...memo,
                replyIds: [replyId]
              },
              [replyId]: replies[0]
            }
          })
        })
        it('should return original state when received undefined', () => {
          expect(reducer(undefined, memoRepliesReceived(undefined, undefined, undefined))).toEqual(
            initialState
          )
        })
      })

      it('should handle MEMO_DELETED', () => {
        const memo = Object.keys(testMemos)[0]
        const deletedMemoId = combineMemoId(memo.username, memo.idx)

        const state = {
          ...initialState,
          memos: testMemos
        }

        const memos = { ...testMemos }
        delete memos[deletedMemoId]

        expect(reducer(state, memoDeleted(deletedMemoId))).toEqual({
          ...initialState,
          memos
        })
      })
    })
  })
})
