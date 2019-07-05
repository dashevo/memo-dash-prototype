import reducer, { initialState } from "./user.reducer"
import {
  loginError,
  loginSuccessfull,
  logoutError,
  logoutSuccessfull,
  likeRemoved,
  memoDeleted
} from "../actions"
import {
  userReceived,
  usersReceived,
  userUpdated
} from "../actions/user.actions"
import { testUsers, testMemos } from "../../test-utils/test-data"

describe("user reducer", () => {
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

    describe("User", () => {
      const alice = testUsers["alice"]
      const bob = testUsers["bob"]

      describe("should handle USERS_RECEIVED", () => {
        it("should add a new user", () => {
          const availableUsers = {
            [alice.username]: alice
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
              [bob.username]: bob
            }
          })
        })

        it("should overwrite an existing user", () => {
          const availableUsers = {
            [alice.username]: alice,
            [bob.username]: { ...bob, profile: { ...bob.profile, bio: "test" } }
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
              [alice.username]: alice,
              [bob.username]: bob
            }
          })
        })
      })

      describe("should handle USER_RECEIVED", () => {
        it("add a new user", () => {
          const user = testUsers["alice"]
          expect(reducer(undefined, userReceived(user))).toEqual({
            ...initialState,
            users: { [alice.username]: user }
          })
        })

        it("should overwrite an existing user", () => {
          const receivedUser = { likes: [{}], ...alice }

          expect(
            reducer(
              {
                ...initialState,
                users: {
                  [alice.username]: alice,
                  [bob.username]: bob
                }
              },
              userReceived(receivedUser)
            )
          ).toEqual({
            ...initialState,
            users: {
              [alice.username]: receivedUser,
              [bob.username]: bob
            }
          })
        })
      })

      describe("should handle USER_UPDATED", () => {
        it("should update an existing user", () => {
          const user = testUsers["alice"]
          const availableUsers = {
            [user.username]: user
          }
          const bio = "testBio"
          expect(
            reducer(
              {
                ...initialState,
                users: availableUsers
              },
              userUpdated(user.username, { bio })
            )
          ).toEqual({
            ...initialState,
            users: { [user.username]: { ...user, bio } }
          })
        })

        it("should return original state if the user is not available", () => {
          const user = testUsers["alice"]
          const bio = "testBio"
          expect(
            reducer(initialState, userUpdated(user.username, { bio }))
          ).toEqual(initialState)
        })
      })
    })

    describe("Likes", () => {
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

    describe("Memos", () => {
      describe("handle MEMO_DELETED", () => {
        const alice = testUsers["alice"]
        const deletedMemoId = alice.memoIds[0]

        it("should return original state if no user found", () => {
          const state = { users: {} }
          expect(reducer(state, memoDeleted(alice.memoIds[0]))).toEqual(state)
        })

        it("should delete a memo", () => {
          const state = {
            currentUser: alice.username,
            users: { [alice.username]: alice }
          }

          expect(reducer(state, memoDeleted(deletedMemoId))).toEqual({
            ...state,
            users: {
              ...state.users,
              [alice.username]: {
                ...alice,
                memoIds: alice.memoIds.filter(
                  memoId => memoId !== deletedMemoId
                )
              }
            }
          })
        })
      })
    })
  })
})
