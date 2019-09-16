import React from "react"
import configureStore from "redux-mock-store"
import { shallow } from "enzyme"
import MemoModalContainer from "./memo-modal.container"

import { getAlice, getAliceMemos } from "../../../test-utils/test-data"

describe("<MemoModalContainer />", () => {
  let store
  let alice
  let memo
  let mockStore

  beforeEach(() => {
    mockStore = configureStore()
    alice = getAlice()
    memo = getAliceMemos()[0]
    const div = document.createElement("div")
    document.body.appendChild(div)
  })

  describe("Shallow rendering", () => {
    describe("should render", () => {
      it("without crashing", () => {
        store = mockStore({
          memoModal: { opened: false },
          memo: { memos: [] }
        })

        const wrapper = shallow(<MemoModalContainer memo={memo} />, {
          context: { store }
        })
        expect(wrapper).toMatchSnapshot()
      })

      it("opened modal", () => {
        store = mockStore({
          memoModal: { opened: true, openedMemo: memo.$scopeId },
          memo: { memos: { [memo.$scopeId]: memo } }
        })

        const wrapper = shallow(<MemoModalContainer memo={memo} />, {
          context: { store }
        })
        expect(wrapper).toMatchSnapshot()
      })
    })
  })
})
