import MemoDashLib from "./memo-dash.lib.vmn.js_"
import { testUsers, testMemos } from "../test-utils/test-data"
import { combineMemoId } from "../store/reducers/memo.reducer"

jest.mock("@dashevo/dash-schema/dash-schema-lib")

describe("MemoDashLib", () => {
  let memoDashLib
  let alice = testUsers["alice"]
  const memo = testMemos[alice.memoIds[0]]
  beforeEach(() => {
    memoDashLib = new MemoDashLib()
    memoDashLib.memoDashClient = {
      getUserProfile: jest.fn().mockReturnValue(alice.profile),
      updateProfile: jest.fn(),
      getUsername: jest.fn().mockReturnValue(alice.username),
      getUserId: jest.fn().mockReturnValue(alice.userId),
      getMemosByUsername: jest.fn().mockReturnValue(alice.memos),
      getMemo: jest.fn().mockReturnValue(memo),
      getMemos: jest.fn(),
      getUserLikes: jest.fn().mockReturnValue(alice.likes),
      postMemo: jest.fn(),
      deleteMemo: jest.fn(),
      editMemo: jest.fn(),
      getUserFollowers: jest.fn().mockReturnValue(
        alice.followers.map(follower => ({
          username: follower
        }))
      ),
      getUserFollowing: jest.fn().mockReturnValue(
        alice.following.map(following => ({
          username: following
        }))
      ),
      getAllProfiles: jest.fn().mockReturnValue([alice.profile])
    }
  })

  describe("Users", () => {
    describe("getUser(username)", () => {
      it("should get user profile from client", () => {
        memoDashLib.getUser(alice.username)
        expect(memoDashLib.memoDashClient.getUserProfile).toHaveBeenCalledWith(
          alice.username
        )
      })

      it("should get user id from client", () => {
        memoDashLib.getUser(alice.username)
        expect(memoDashLib.memoDashClient.getUserId).toHaveBeenCalledWith(
          alice.username
        )
      })

      it("should return user with all info", async () => {
        const user = await memoDashLib.getUser(alice.username)
        expect(user).toEqual({
          username: alice.username,
          profile: alice.profile,
          userId: alice.userId,
          followers: alice.followers,
          following: alice.following,
          likes: alice.likes
        })
      })

      it("should return an array with all users ", async () => {
        const user = await memoDashLib.getAllUsers()
        expect(user).toEqual([
          {
            username: alice.username,
            profile: alice.profile,
            userId: alice.userId,
            followers: alice.followers,
            following: alice.following,
            likes: alice.likes
          }
        ])
      })
    })
  })

  describe("User profile", () => {
    describe("getUserProfile(username", () => {
      it("should get user profile from client", () => {
        memoDashLib.getUserProfile(alice.username)
        expect(memoDashLib.memoDashClient.getUserProfile).toHaveBeenCalledWith(
          alice.username
        )
      })

      it("should update user profile", () => {
        const bio = "bio"
        memoDashLib.updateProfile(bio)
        expect(memoDashLib.memoDashClient.updateProfile).toHaveBeenCalledWith({
          text: bio
        })
      })
    })
  })

  describe("Memos", () => {
    describe("getMemosForUser(username)", () => {
      it("should get memos from client", () => {
        memoDashLib.getMemosForUser(alice.username)
        expect(
          memoDashLib.memoDashClient.getMemosByUsername
        ).toHaveBeenCalledWith(alice.username)
      })
    })

    describe("getMemos()", () => {
      it("should get all memos", () => {
        memoDashLib.getMemos()
        expect(memoDashLib.memoDashClient.getMemos).toHaveBeenCalled()
      })
    })

    describe("getMemos(combinedMemoIds)", () => {
      it("should get memos for passed ids", () => {
        memoDashLib.getMemos([{ username: alice.username, idx: 1 }])
        expect(memoDashLib.memoDashClient.getMemo).toHaveBeenCalledWith(
          alice.username,
          1
        )
      })
    })

    describe("getMemo(username, memoId)", () => {
      it("should get memo from client", () => {
        const memoId = 1
        memoDashLib.getMemo(alice.username, memoId)
        expect(memoDashLib.memoDashClient.getMemo).toHaveBeenCalledWith(
          alice.username,
          memoId
        )
      })
    })

    describe("postMemo(message)", () => {
      it("should post memo", () => {
        const message = "message"
        memoDashLib.postMemo(message)
        expect(memoDashLib.memoDashClient.postMemo).toHaveBeenCalledWith(
          message
        )
      })
    })

    describe("deleteMemo(memoId)", () => {
      it("should delete memo", () => {
        const memoId = 1
        memoDashLib.deleteMemo(memoId)
        expect(memoDashLib.memoDashClient.deleteMemo).toHaveBeenCalledWith(
          memoId
        )
      })
    })

    describe("editMemo(memoId, message)", () => {
      it("should edit memo", () => {
        const memoId = 1
        const message = "newMessage"
        memoDashLib.editMemo(memoId, message)
        expect(memoDashLib.memoDashClient.editMemo).toHaveBeenCalledWith(
          memoId,
          message
        )
      })
    })
  })

  describe("Likes", () => {
    describe("getUserLikes(username)", () => {
      it("should get like for a user from client", () => {
        memoDashLib.getUserLikes(alice.username)
        expect(memoDashLib.memoDashClient.getUserLikes).toHaveBeenCalled()
      })
    })
  })

  describe("Followers", () => {
    describe("getUserFollowers(username)", () => {
      it("should get followers for a user from client", () => {
        memoDashLib.getUserFollowers(alice.username)
        expect(
          memoDashLib.memoDashClient.getUserFollowers
        ).toHaveBeenCalledWith(alice.username)
      })
    })
  })

  describe("Following", () => {
    describe("getUserFollowing(username)", () => {
      it("should get users who follows the passed user from client", () => {
        memoDashLib.getUserFollowing(alice.username)
        expect(
          memoDashLib.memoDashClient.getUserFollowing
        ).toHaveBeenCalledWith(alice.username)
      })
    })
  })
})
