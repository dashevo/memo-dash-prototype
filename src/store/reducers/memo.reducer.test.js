import reducer, { initialState, combineMemoId } from './memo.reducer'
import { memosReceived, memoUpdated, memoRepliesReceived } from '../actions/memo.actions'
import testUsers from '../../test-utils/test-users'

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
    describe('Memos', () => {
      let memos
      beforeEach(() => {
        const user = testUsers['alice']
        memos = [user.memos[0], user.memos[1]]
      })

      describe('should handle MEMOS_RECEIVED', () => {
        it('should add received memos to the state', () => {
          expect(reducer(undefined, memosReceived(memos))).toEqual({
            ...initialState,
            memos: {
              [combineMemoId(memos[0].username, memos[0].idx)]: memos[0],
              [combineMemoId(memos[1].username, memos[1].idx)]: memos[1]
            }
          })
        })

        it('should return original state when received undefined', () => {
          expect(reducer(undefined, memosReceived(undefined))).toEqual(initialState)
        })
      })

      it('should handle MEMO_UPDATED', () => {
        const memo = { ...memos[0], memoLikesCount: 1 }
        const state = {
          ...initialState,
          memos: { [combineMemoId(memos[0].username, memos[0].idx)]: memos[0] }
        }

        expect(reducer(state, memoUpdated(memo))).toEqual({
          ...initialState,
          memos: { [combineMemoId(memos[0].username, memos[0].idx)]: { ...memo } }
        })
      })
      describe('should handle MEMO_REPLIES_RECEIVED', () => {
        it('should add received replies to the state', () => {
          const memo = memos[0]
          const replies = [testUsers['bob'].memos[0]]
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
    })
  })
})
