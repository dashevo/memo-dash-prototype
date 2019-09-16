import {
  testUsers,
  testMemos,
  testProfiles,
  getBob,
  getAlice,
  getAliceMemos,
  getBobMemos
} from "../../test-utils/test-data"
import * as selector from "./memo.selector"

describe("memo selector", () => {
  let alice
  let aliceMemos
  let bob
  let bobMemos
  let state
  let memo

  beforeEach(() => {
    alice = getAlice()
    aliceMemos = getAliceMemos()
    memo = aliceMemos[0]

    bob = getBob()
    bobMemos = getBobMemos()

    state = {
      user: {
        currentUser: alice.uname,
        users: { [alice.uname]: alice, [bob.uname]: bob }
      },
      memo: {
        memos: testMemos
      }
    }
  })

  it("should return memos", () => {
    expect(selector.getMemos(state)).toEqual(state.memo.memos)
  })

  it("should return memo by scopeId", () => {
    expect(selector.getMemoByScopeId(memo.$scopeId)(state)).toEqual(memo)
  })

  it("should return memos by scopeIds", () => {
    expect(selector.getMemosByCombinedIds([memo.$scopeId])(state)).toEqual([
      memo
    ])
  })

  it("should return true if memo belongs to current user", () => {
    expect(selector.isMemoOfCurrentUser(memo)(state)).toEqual(true)
  })

  it("should return false if memo does not belong to current user", () => {
    const bobsMemo = bobMemos[0]
    expect(selector.isMemoOfCurrentUser(bobsMemo)(state)).toEqual(false)
  })

  it.skip("should return true if memo is likes by current user", () => {
    const memo = testMemos[bob.memoIds[0]]
    expect(selector.isMemoLikedByCurrentUser(memo)(state)).toEqual(true)
  })

  it.skip("should return true if memo is likes by current user", () => {
    const memo = { ...testMemos[bob.memoIds[0]], idx: 3 }
    expect(selector.isMemoLikedByCurrentUser(memo)(state)).toEqual(false)
  })
})
