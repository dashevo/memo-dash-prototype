import * as userProfileActions from "./user-profile.actions"
import * as userActions from "./user.actions"
import { mockStoreAndDispatch } from "../../test-utils/actions.test-helper"
import { getAlice, getBob, testUsers } from "../../test-utils/test-data"
import * as userSelectors from "../selectors/user.selector"

describe("user profile actions", () => {
  let alice
  let bob

  beforeEach(() => {
    alice = getAlice()
    bob = getBob()
  })

  describe("when dispatching action", () => {
    let spies
    let state

    beforeEach(async () => {
      userSelectors.getUserFollowers = jest.fn(() =>
        jest.fn().mockReturnValue([bob.uname, "charlie"])
      )
      userSelectors.getUserFollowing = jest.fn(() =>
        jest.fn().mockReturnValue([bob.uname, "charlie"])
      )
      userSelectors.getMissingUsers = jest.fn(() =>
        jest.fn().mockReturnValue(["charlie"])
      )
      userActions.getUsers = jest.fn(() => jest.fn())

      spies = {
        followUser: jest.fn(),
        unFollowUser: jest.fn()
      }

      state = {
        root: {
          memoDashLib: {
            ...spies
          }
        },
        user: {
          currentUser: alice.uname,
          users: testUsers
        }
      }
    })

    describe("getFollowersForUser(userId)", () => {
      it("should get user followers from state", async () => {
        await mockStoreAndDispatch(
          state,
          userProfileActions.getFollowersForUser(alice.uname)
        )
        expect(userSelectors.getUserFollowers).toHaveBeenCalledWith(alice.uname)
      })

      it("should get missing users from state", async () => {
        await mockStoreAndDispatch(
          state,
          userProfileActions.getFollowersForUser(alice.uname)
        )
        expect(userSelectors.getMissingUsers).toHaveBeenCalledWith([
          bob.uname,
          "charlie"
        ])
      })

      it("should dispatch getUsers", async () => {
        await mockStoreAndDispatch(
          state,
          userProfileActions.getFollowersForUser(alice.uname)
        )
        expect(userActions.getUsers).toHaveBeenCalledWith(["charlie"])
      })
    })

    describe("getFollowingForUser(regtxid)", () => {
      it("should get user following from state", async () => {
        await mockStoreAndDispatch(
          state,
          userProfileActions.getFollowingForUser(alice.uname)
        )
        expect(userSelectors.getUserFollowing).toHaveBeenCalledWith(alice.uname)
      })

      it("should get missing users from state", async () => {
        await mockStoreAndDispatch(
          state,
          userProfileActions.getFollowingForUser(alice.uname)
        )
        expect(userSelectors.getMissingUsers).toHaveBeenCalledWith([
          bob.uname,
          "charlie"
        ])
      })

      it("should dispatch getUsers", async () => {
        await mockStoreAndDispatch(
          state,
          userProfileActions.getFollowingForUser(alice.uname)
        )
        expect(userActions.getUsers).toHaveBeenCalledWith(["charlie"])
      })
    })

    describe("followUser(regtxid)", () => {
      it("should call lib.followUser(regtxid)", async () => {
        await mockStoreAndDispatch(
          state,
          userProfileActions.followUser(alice.uname)
        )
        expect(spies.followUser).toHaveBeenCalledWith(alice.uname)
      })

      it("should dispatch getUsers", async () => {
        await mockStoreAndDispatch(
          state,
          userProfileActions.followUser(bob.uname)
        )
        expect(userActions.getUsers).toHaveBeenCalledWith([
          bob.uname,
          alice.uname
        ])
      })
    })

    describe("unFollowUser(regtxid)", () => {
      it("should call lib.unFollowUser(regtxid)", async () => {
        await mockStoreAndDispatch(
          state,
          userProfileActions.unFollowUser(alice.uname)
        )
        expect(spies.unFollowUser).toHaveBeenCalledWith(alice.uname)
      })

      it("should dispatch getUsers", async () => {
        await mockStoreAndDispatch(
          state,
          userProfileActions.unFollowUser(bob.uname)
        )
        expect(userActions.getUsers).toHaveBeenCalledWith([
          bob.uname,
          alice.uname
        ])
      })
    })
  })
})
