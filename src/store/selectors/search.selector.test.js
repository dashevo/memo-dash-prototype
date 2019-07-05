import { testUsers, testMemos } from "../../test-utils/test-data"
import * as selector from "./search.selector"

describe("search selector", () => {
  const category = "category"

  const alice = testUsers["alice"]
  const bob = testUsers["bob"]

  const state = {
    user: {
      users: { [alice.username]: alice, [bob.username]: bob }
    },
    memo: {
      memos: {
        [alice.memoIds[0]]: testMemos[alice.memoIds[0]],
        [bob.memoIds[0]]: testMemos[bob.memoIds[0]]
      }
    }
  }

  it("should return users", () => {
    const result = [
      {
        category,
        childKey: alice.username,
        description: alice.profile.bio,
        image: alice.profile.avatarUrl,
        title: alice.username
      },
      {
        category,
        childKey: bob.username,
        description: bob.profile.bio,
        image: bob.profile.avatarUrl,
        title: bob.username
      }
    ]

    expect(selector.getUsersForSearch(category)(state)).toEqual(result)
  })

  it("should return memos", () => {
    const result = [
      {
        category,
        childKey: alice.memoIds[0],
        image: alice.profile.avatarUrl,
        title: testMemos[alice.memoIds[0]].memoText
      },
      {
        category,
        childKey: bob.memoIds[0],
        image: bob.profile.avatarUrl,
        title: testMemos[bob.memoIds[0]].memoText
      }
    ]

    expect(selector.getMemosForSearch(category)(state)).toEqual(result)
  })
})
