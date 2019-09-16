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
import {
  testUsers,
  testProfiles,
  testMemos,
  getBob,
  getAlice,
  getAliceMemos
} from "../../test-utils/test-data"

describe("user reducer", () => {
  let alice
  let aliceMemos
  let bob

  beforeEach(() => {
    alice = getAlice()
    aliceMemos = getAliceMemos()
    bob = getBob()
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
      alice = getAlice()
      aliceProfile = testProfiles[alice.uname]

      bob = getBob()
      bobProfile = testProfiles[bob.uname]
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
          [alice.uname]: aliceProfile
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
            [bob.uname]: bobProfile
          }
        })
      })

      it("should update profile", () => {
        const availableProfiles = {
          [alice.uname]: aliceProfile,
          [bob.uname]: { ...bobProfile, address: "Nowhere" }
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
            [bob.uname]: bobProfile
          }
        })
      })
    })

    describe("User", () => {
      describe("should handle USERS_RECEIVED", () => {
        it("should add a new user", () => {
          const availableUsers = {
            [alice.uname]: alice
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
              [bob.uname]: bob
            }
          })
        })

        it("should overwrite an existing user", () => {
          const availableUsers = {
            [alice.uname]: alice,
            [bob.uname]: { ...bob, credits: bob.credits + 100 }
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
              [alice.uname]: alice,
              [bob.uname]: bob
            }
          })
        })
      })

      describe("should handle USER_RECEIVED", () => {
        it("add a new user", () => {
          expect(reducer(undefined, userReceived(alice))).toEqual({
            ...initialState,
            users: { [alice.uname]: alice }
          })
        })

        it("should overwrite an existing user", () => {
          const receivedUser = { ...alice, credits: alice.credits + 100 }

          expect(
            reducer(
              {
                ...initialState,
                users: {
                  [alice.uname]: alice,
                  [bob.uname]: bob
                }
              },
              userReceived(receivedUser)
            )
          ).toEqual({
            ...initialState,
            users: {
              [alice.uname]: receivedUser,
              [bob.uname]: bob
            }
          })
        })
      })

      describe("should handle USER_UPDATED", () => {
        it("should update an existing user", () => {
          const availableUsers = {
            [alice.uname]: alice
          }
          const credits = alice.credits + 100
          expect(
            reducer(
              {
                ...initialState,
                users: availableUsers
              },
              userUpdated(alice.uname, { credits })
            )
          ).toEqual({
            ...initialState,
            users: { [alice.uname]: { ...alice, credits } }
          })
        })

        it("should return original state if the user is not available", () => {
          const credits = 1024
          expect(
            reducer(initialState, userUpdated(alice.uname, { credits }))
          ).toEqual(initialState)
        })
      })
    })

    describe.skip("Likes", () => {
      describe("handle LIKE_REMOVED", () => {
        const alice = getAlice()

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
