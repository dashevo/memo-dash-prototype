import * as selector from "./memo-modal.selector"
import { testUsers, testMemos } from "../../test-utils/test-data"
import { combineMemoId } from "../reducers/memo.reducer"

describe("memo-modal selector", () => {
  const alice = testUsers["alice"]
  const memo = testMemos[alice.memoIds[0]]

  const state = {
    memoModal: {
      opened: true,
      openedMemo: combineMemoId(memo.username, memo.idx)
    },
    memo: {
      memos: {
        [combineMemoId(memo.username, memo.idx)]: memo
      }
    }
  }

  it("should return true if memo modal is opened", () => {
    expect(selector.isMemoModalOpened(state)).toEqual(true)
  })

  it("should return false if memo modal is opened", () => {
    const changedState = {
      ...state,
      memoModal: { ...state.memoModal, opened: false }
    }
    expect(selector.isMemoModalOpened(changedState)).toEqual(false)
  })

  it("should return opened memo", () => {
    expect(selector.getOpenedMemo(state)).toEqual(memo)
  })
})
