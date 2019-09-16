import * as selector from "./memo-modal.selector"
import { getAliceMemos } from "../../test-utils/test-data"

describe("memo-modal selector", () => {
  const memo = getAliceMemos()[0]

  const state = {
    memoModal: {
      opened: true,
      openedMemo: memo.$scopeId
    },
    memo: {
      memos: {
        [memo.$scopeId]: memo
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
