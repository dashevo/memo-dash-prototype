import { testUsers, testMemos, testProfiles } from "../../test-utils/test-data"
import * as selector from "./user.selector"

describe("user selector", () => {
  let alice
  let aliceProfile
  let aliceMemos
  let bob
  let bobProfile
  let state

  beforeEach(() => {
    alice = Object.values(testUsers).find(user => user.uname === "alice")
    aliceProfile = testProfiles[alice.regtxid]
    aliceMemos = Object.values(testMemos).filter(
      memo => memo.$meta.userId === alice.regtxid
    )

    bob = Object.values(testUsers).find(user => user.uname === "bob")
    bobProfile = testProfiles[bob.regtxid]

    state = {
      user: {
        currentUser: alice.regtxid,
        authError: undefined,
        users: testUsers,
        profiles: testProfiles
      },
      memo: {
        memos: testMemos
      }
    }
  })

  it("should return current user id", () => {
    expect(selector.getCurrentUserId(state)).toEqual(alice.regtxid)
  })

  it("should return current user", () => {
    expect(selector.getCurrentUser(state)).toEqual(alice)
  })

  it("should return user by id", () => {
    expect(selector.getUserByUserId(bob.regtxid)(state)).toEqual(bob)
  })

  it("should return user by username", () => {
    expect(selector.getUserByUserName(bob.uname)(state)).toEqual(bob)
  })

  it("should return avatar url", () => {
    expect(selector.getAvatarUrl(alice.regtxid)(state)).toEqual(
      aliceProfile.avatarUrl
    )
  })

  it("should return user profile", () => {
    expect(selector.getUserProfile(alice.regtxid)(state)).toEqual(aliceProfile)
  })

  it("should return user id", () => {
    expect(selector.getUserIdByUserName(alice.uname)(state)).toEqual(
      alice.regtxid
    )
  })

  it("should return user profile by username", () => {
    expect(selector.getUserProfileByUserName(alice.uname)(state)).toEqual(
      aliceProfile
    )
  })

  it("should return user memos", () => {
    expect(selector.getUserMemos(alice.regtxid)(state)).toEqual(aliceMemos)
  })

  it.skip("should return user liked memos", () => {
    const likedMemos = {
      "[bob][1]": testMemos["[bob][1]"],
      "[bob][2]": testMemos["[bob][2]"]
    }
    expect(selector.getUserLikedMemos(alice.username)(state)).toEqual(
      likedMemos
    )
  })

  it.skip("should return user followers", () => {
    expect(selector.getUserFollowers(alice.username)(state)).toEqual([bob])
  })

  it.skip("should return user following", () => {
    expect(selector.getUserFollowing(alice.username)(state)).toEqual([bob])
  })

  describe.skip("amIFollowing", () => {
    it("should return true if following user", () => {
      expect(selector.amIFollowing(bob.username)(state)).toEqual(true)
    })

    it("should return false if not following user", () => {
      expect(selector.amIFollowing("charlie")(state)).toEqual(false)
    })

    it("should return false if check for current user", () => {
      expect(selector.amIFollowing(alice.username)(state)).toEqual(false)
    })
  })

  describe("isProfileOfCurrentUser", () => {
    it("should return true if profile belongs to current user", () => {
      expect(selector.isProfileOfCurrentUser(aliceProfile)(state)).toEqual(true)
    })

    it("should return false if profile does not belong to current user", () => {
      expect(selector.isProfileOfCurrentUser(bobProfile)(state)).toEqual(false)
    })
  })

  describe("missing users", () => {
    it("should return an empty array if all users are available", () => {
      expect(
        selector.getMissingUsers([alice.regtxid, bob.regtxid])(state)
      ).toEqual([])
    })

    it("should return an array with the missing user", () => {
      const missingUser = { regtxid: "charlie" }
      expect(
        selector.getMissingUsers([alice.regtxid, missingUser.regtxid])(state)
      ).toEqual([missingUser.regtxid])
    })
  })
})
