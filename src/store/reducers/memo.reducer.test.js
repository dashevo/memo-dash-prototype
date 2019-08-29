import reducer, { initialState } from "./memo.reducer"
import {
  memosReceived,
  memoUpdated,
  memoRepliesReceived,
  memoDeleted
} from "../actions/memo.actions"
import { testUsers, testMemos } from "../../test-utils/test-data"

describe("memo reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  describe("not relevant actions", () => {
    it("should return unchanged state", () => {
      const state = {}
      expect(reducer(state, {})).toBe(state)
    })
  })

  describe("relevant actions", () => {
    let memo
    beforeEach(() => {
      memo = testMemos["yPyxJ3ppBYhMWgCGrLXPGtEhfbAG6XP6WL"]
    })

    describe("Memos", () => {
      describe("should handle MEMOS_RECEIVED", () => {
        it("should add received memos to the state", () => {
          expect(reducer(undefined, memosReceived([memo]))).toEqual({
            ...initialState,
            memos: { ["yPyxJ3ppBYhMWgCGrLXPGtEhfbAG6XP6WL"]: memo }
          })
        })

        it("should return original state when received undefined", () => {
          expect(reducer(undefined, memosReceived(undefined))).toEqual(
            initialState
          )
        })
      })

      it("should handle MEMO_UPDATED", () => {
        const updatedMemo = { ...memo, memoLikesCount: 1 }
        const state = {
          ...initialState,
          memos: { [memo.$scopeId]: memo }
        }

        expect(reducer(state, memoUpdated(updatedMemo))).toEqual({
          ...initialState,
          memos: {
            [updatedMemo.$scopeId]: {
              ...updatedMemo
            }
          }
        })
      })
      describe.skip("should handle MEMO_REPLIES_RECEIVED", () => {
        it("should add received replies to the state", () => {
          const replies = [testMemos["[bob][1]"]]
          const replyId = replies[0].$scopeId
          const state = {
            ...initialState,
            memos: { [memo.$scopeId]: memo }
          }

          expect(
            reducer(
              state,
              memoRepliesReceived(memo.username, memo.idx, replies)
            )
          ).toEqual({
            ...initialState,
            memos: {
              [memo.$scopeId]: {
                ...memo,
                replyIds: [replyId]
              },
              [replyId]: replies[0]
            }
          })
        })
        it("should return original state when received undefined", () => {
          expect(
            reducer(
              undefined,
              memoRepliesReceived(undefined, undefined, undefined)
            )
          ).toEqual(initialState)
        })
      })

      describe("delete", () => {
        let memo

        beforeEach(() => {
          memo = Object.keys(testMemos)[0]
        })

        it("should return original state if no user found", () => {
          expect(reducer(initialState, memoDeleted(memo.$scopeId))).toEqual(
            initialState
          )
        })

        it("should handle MEMO_DELETED", () => {
          const state = {
            ...initialState,
            memos: testMemos
          }

          const memos = { ...testMemos }
          delete memos[memo.$scopeId]

          expect(reducer(state, memoDeleted(memo.$scopeId))).toEqual({
            ...initialState,
            memos
          })
        })
      })
    })
  })
})
