import * as userActions from "./user.actions"
import { UserActionTypes } from "./user.actions"
import {
  verifyAction,
  mockStoreAndDispatch,
  getAction
} from "../../test-utils/actions.test-helper"
import { testUsers } from "../../test-utils/test-data"

describe("user actions", () => {
  const alice = testUsers["alice"]

  describe("should create an action", () => {
    it("to indicate the user was updated", () => {
      verifyAction(
        UserActionTypes.USER_UPDATED,
        { username: alice.username, props: "" },
        () => userActions.userUpdated(alice.username, "")
      )
    })

    it("to indicate the user was received", () => {
      verifyAction(UserActionTypes.USER_RECEIVED, "", userActions.userReceived)
    })

    it("to indicate multiple users were received", () => {
      verifyAction(
        UserActionTypes.USERS_RECEIVED,
        "",
        userActions.usersReceived
      )
    })
  })

  describe("when dispatching action", () => {
    let spies
    let state

    beforeEach(async () => {
      spies = {
        getUser: jest.fn(),
        getUsers: jest.fn(),
        updateProfile: jest.fn(),
        getUserProfile: jest.fn()
      }
      state = {
        root: {
          memoDashLib: {
            ...spies
          }
        },
        user: {
          currentUser: alice.username,
          users: { [alice.username]: alice }
        }
      }
    })

    describe("User", () => {
      describe("getUser", () => {
        it("should call memoDashLib.getuser", async () => {
          await mockStoreAndDispatch(state, userActions.getUser())
          expect(spies.getUser).toHaveBeenCalled()
        })

        it("should dispatch userReceived", async () => {
          state.root.memoDashLib.getUser.mockReturnValue(alice)
          const actions = await mockStoreAndDispatch(
            state,
            userActions.getUser()
          )
          expect(
            await getAction(actions, UserActionTypes.USER_RECEIVED)
          ).toEqual(userActions.userReceived(alice))
        })
      })

      describe("getUsers", () => {
        it("should call memoDashLib.getusers", async () => {
          await mockStoreAndDispatch(state, userActions.getUsers())
          expect(spies.getUsers).toHaveBeenCalled()
        })

        it("should dispatch usersReceived", async () => {
          const users = [alice, testUsers["bob"]]
          state.root.memoDashLib.getUsers.mockReturnValue(users)
          const actions = await mockStoreAndDispatch(
            state,
            userActions.getUsers()
          )
          expect(
            await getAction(actions, UserActionTypes.USERS_RECEIVED)
          ).toEqual(userActions.usersReceived(users))
        })
      })

      describe("updateProfile", () => {
        const bio = "bio"

        it("should call memoDashLib.updateProfile", async () => {
          await mockStoreAndDispatch(state, userActions.updateProfile(bio))
          expect(spies.updateProfile).toHaveBeenCalledWith(bio)
        })

        it("should call memoDashLib.getUserProfile", async () => {
          await mockStoreAndDispatch(state, userActions.updateProfile(bio))
          expect(spies.getUserProfile).toHaveBeenCalledWith(alice.username)
        })

        it("should dispatch userUpdated", async () => {
          const newProfile = { ...alice.profile, bio }
          state.root.memoDashLib.getUserProfile.mockReturnValue(newProfile)
          const actions = await mockStoreAndDispatch(
            state,
            userActions.updateProfile(bio)
          )

          expect(
            await getAction(actions, UserActionTypes.USER_UPDATED)
          ).toEqual(
            userActions.userUpdated(alice.username, { profile: newProfile })
          )
        })
      })
    })
  })
})
