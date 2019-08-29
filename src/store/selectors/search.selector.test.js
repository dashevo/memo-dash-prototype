import { testUsers, testMemos, testProfiles } from "../../test-utils/test-data"
import * as selector from "./search.selector"

describe("search selector", () => {
  const category = "category"

  let alice
  let aliceProfile
  let aliceMemos
  let bob
  let bobProfile
  let bobMemos
  let state

  beforeEach(() => {
    alice = Object.values(testUsers).find(user => user.uname === "alice")
    aliceProfile = testProfiles[alice.regtxid]
    aliceMemos = Object.values(testMemos).filter(
      memo => memo.$meta.userId === alice.regtxid
    )

    bob = Object.values(testUsers).find(user => user.uname === "bob")
    bobProfile = testProfiles[bob.regtxid]
    bobMemos = Object.values(testMemos).filter(
      memo => memo.$meta.userId === bob.regtxid
    )

    state = {
      user: {
        currentUser: alice.regtxid,
        users: testUsers,
        profiles: testProfiles
      },
      memo: {
        memos: testMemos
      }
    }
  })

  it("should return users", () => {
    const result = [
      {
        category,
        childKey: alice.regtxid,
        description: aliceProfile.text,
        image: aliceProfile.avatarUrl,
        title: alice.uname
      },
      {
        category,
        childKey: bob.regtxid,
        description: bobProfile.text,
        image: bobProfile.avatarUrl,
        title: bob.uname
      }
    ]

    expect(selector.getUsersForSearch(category)(state)).toEqual(result)
  })

  it("should return memos", () => {
    const result = [
      {
        category,
        childKey: aliceMemos[0].$scopeId,
        image: aliceProfile.avatarUrl,
        title: aliceMemos[0].message
      },
      {
        category,
        childKey: aliceMemos[1].$scopeId,
        image: aliceProfile.avatarUrl,
        title: aliceMemos[1].message
      },
      {
        category,
        childKey: bobMemos[0].$scopeId,
        image: bobProfile.avatarUrl,
        title: bobMemos[0].message
      }
    ]

    expect(selector.getMemosForSearch(category)(state)).toEqual(result)
  })
})
