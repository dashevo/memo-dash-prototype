import reducer, { initialState } from "./user.reducer"
import {
  loginError,
  loginSuccessfull,
  logoutError,
  logoutSuccessfull,
  likeRemoved,
  memoDeleted,
  userProfileReceived
} from "../actions"
import {
  userReceived,
  usersReceived,
  userUpdated
} from "../actions/user.actions"
import { testUsers, testProfiles, testMemos } from "../../test-utils/test-data"

describe("user reducer", () => {
  let alice
  let aliceMemos
  let bob

  beforeEach(() => {
    alice = Object.values(testUsers).find(user => user.uname === "alice")
    aliceMemos = Object.values(testMemos).filter(
      memo => memo.$meta.userId === alice.regtxid
    )
    bob = Object.values(testUsers).find(user => user.uname === "bob")
  })

  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  describe("not relevant actions", () => {
    it("should return unchanged state", () => {
      const state = {}
      expect(reducer(state, {})).toBe(state)
    })
  })

  describe("relevant actions", () => {
    let alice
    let aliceProfile
    let bob
    let bobProfile

    beforeEach(() => {
      alice = Object.values(testUsers).find(user => user.uname === "alice")
      aliceProfile = testProfiles[alice.regtxid]

      bob = Object.values(testUsers).find(user => user.uname === "bob")
      bobProfile = testProfiles[bob.regtxid]
    })

    describe("Auth", () => {
      it("should handle LOGIN_ERROR", () => {
        const error = "LoginError"
        expect(reducer([], loginError(error))).toEqual({ authError: error })
      })

      it("should handle LOGOUT_ERROR", () => {
        const error = "LogoutError"
        expect(reducer([], logoutError(error))).toEqual({ authError: error })
      })

      it("should handle LOGIN_SUCCESSFULL", () => {
        const username = "UserName"
        expect(reducer(undefined, loginSuccessfull(username))).toEqual({
          ...initialState,
          currentUser: username
        })
      })

      it("should handle LOGOUT_SUCCESSFULL", () => {
        expect(reducer(undefined, logoutSuccessfull())).toEqual({
          ...initialState
        })
      })
    })

    describe("Profile", () => {
      it("should add profile", () => {
        const availableProfiles = {
          [alice.regtxid]: aliceProfile
        }

        expect(
          reducer(
            {
              ...initialState,
              profiles: availableProfiles
            },
            userProfileReceived(bobProfile)
          )
        ).toEqual({
          ...initialState,
          profiles: {
            ...availableProfiles,
            [bob.regtxid]: bobProfile
          }
        })
      })

      it("should update profile", () => {
        const availableProfiles = {
          [alice.regtxid]: aliceProfile,
          [bob.regtxid]: { ...bobProfile, address: "Nowhere" }
        }

        expect(
          reducer(
            {
              ...initialState,
              profiles: availableProfiles
            },
            userProfileReceived(bobProfile)
          )
        ).toEqual({
          ...initialState,
          profiles: {
            ...availableProfiles,
            [bob.regtxid]: bobProfile
          }
        })
      })
    })

    describe("User", () => {
      describe("should handle USERS_RECEIVED", () => {
        it("should add a new user", () => {
          const availableUsers = {
            [alice.regtxid]: alice
          }

          const newUsers = [bob]
          expect(
            reducer(
              {
                ...initialState,
                users: availableUsers
              },
              usersReceived(newUsers)
            )
          ).toEqual({
            ...initialState,
            users: {
              ...availableUsers,
              [bob.regtxid]: bob
            }
          })
        })

        it("should overwrite an existing user", () => {
          const availableUsers = {
            [alice.regtxid]: alice,
            [bob.regtxid]: { ...bob, credits: bob.credits + 100 }
          }

          const newUsers = [bob]
          expect(
            reducer(
              {
                ...initialState,
                users: availableUsers
              },
              usersReceived(newUsers)
            )
          ).toEqual({
            ...initialState,
            users: {
              [alice.regtxid]: alice,
              [bob.regtxid]: bob
            }
          })
        })
      })

      describe("should handle USER_RECEIVED", () => {
        it("add a new user", () => {
          expect(reducer(undefined, userReceived(alice))).toEqual({
            ...initialState,
            users: { [alice.regtxid]: alice }
          })
        })

        it("should overwrite an existing user", () => {
          const receivedUser = { ...alice, credits: alice.credits + 100 }

          expect(
            reducer(
              {
                ...initialState,
                users: {
                  [alice.regtxid]: alice,
                  [bob.regtxid]: bob
                }
              },
              userReceived(receivedUser)
            )
          ).toEqual({
            ...initialState,
            users: {
              [alice.regtxid]: receivedUser,
              [bob.regtxid]: bob
            }
          })
        })
      })

      describe("should handle USER_UPDATED", () => {
        it("should update an existing user", () => {
          const availableUsers = {
            [alice.regtxid]: alice
          }
          const credits = alice.credits + 100
          expect(
            reducer(
              {
                ...initialState,
                users: availableUsers
              },
              userUpdated(alice.regtxid, { credits })
            )
          ).toEqual({
            ...initialState,
            users: { [alice.regtxid]: { ...alice, credits } }
          })
        })

        it("should return original state if the user is not available", () => {
          const credits = 1024
          expect(
            reducer(initialState, userUpdated(alice.regtxid, { credits }))
          ).toEqual(initialState)
        })
      })
    })

    describe.skip("Likes", () => {
      describe("handle LIKE_REMOVED", () => {
        const alice = testUsers["alice"]

        it("should return original state if no user found", () => {
          const state = { users: {} }
          expect(reducer(state, likeRemoved(alice.likes[0].idx))).toEqual(state)
        })

        it("should remove a like", () => {
          const state = {
            currentUser: alice.username,
            users: { [alice.username]: alice }
          }

          expect(reducer(state, likeRemoved(alice.likes[0].idx))).toEqual({
            ...state,
            users: {
              ...state.users,
              [alice.username]: {
                ...alice,
                likes: [alice.likes[1]],
                profile: {
                  ...alice.profile,
                  likesCount: alice.profile.likesCount - 1
                }
              }
            }
          })
        })
      })
    })
  })
})
