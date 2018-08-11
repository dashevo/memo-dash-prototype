import reducer, { initialState } from './user.reducer'
import { loginError, loginSuccessfull, logoutError, logoutSuccessfull, likeRemoved } from '../actions'
import { userReceived, usersReceived, userUpdated } from '../actions/user.actions'
import testUsers from '../../test-utils/test-users'

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  describe('not relevant actions', () => {
    it('should return unchanged state', () => {
      const state = {}
      expect(reducer(state, {})).toBe(state)
    })
  })

  describe('relevant actions', () => {
    describe('Auth', () => {
      it('should handle LOGIN_ERROR', () => {
        const error = 'LoginError'
        expect(reducer([], loginError(error))).toEqual({ authError: error })
      })

      it('should handle LOGOUT_ERROR', () => {
        const error = 'LogoutError'
        expect(reducer([], logoutError(error))).toEqual({ authError: error })
      })

      it('should handle LOGIN_SUCCESSFULL', () => {
        const username = 'UserName'
        expect(reducer(undefined, loginSuccessfull(username))).toEqual({
          ...initialState,
          currentUser: username
        })
      })

      it('should handle LOGOUT_SUCCESSFULL', () => {
        expect(reducer(undefined, logoutSuccessfull())).toEqual({
          ...initialState
        })
      })
    })

    describe('User', () => {
      const alice = testUsers['alice']
      const bob = testUsers['bob']

      describe('should handle USERS_RECEIVED', () => {
        it('should add a new user', () => {
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

        it('should overwrite an existing user', () => {
          const availableUsers = {
            [alice.username]: alice,
            [bob.username]: { ...bob, bio: 'test' }
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

      describe('should handle USER_RECEIVED', () => {
        it('add a new user', () => {
          const user = testUsers['alice']
          expect(reducer(undefined, userReceived(user))).toEqual({
            ...initialState,
            users: { [alice.username]: user }
          })
        })

        it('should overwrite an existing user', () => {
          const receivedUser = { ownLikes: [{}], ...alice }

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

      describe('should handle USER_UPDATED', () => {
        it('should update an existing user', () => {
          const user = testUsers['alice']
          const availableUsers = {
            [user.username]: user
          }
          const bio = 'testBio'
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

        it('should return original state if the user is not available', () => {
          const user = testUsers['alice']
          const bio = 'testBio'
          expect(reducer(initialState, userUpdated(user.username, { bio }))).toEqual(initialState)
        })
      })
    })

    describe('Likes', () => {
      describe('handle LIKE_REMOVED', () => {
        it('should return original state if no user found', () => {
          const state = { users: {} }
          expect(reducer(state, likeRemoved('1'))).toEqual(state)
        })

        it('should remove a like', () => {
          const alice = testUsers['alice']
          const state = {
            currentUser: alice.username,
            users: { [alice.username]: alice }
          }

          expect(reducer(state, likeRemoved(1))).toEqual({
            ...state,
            users: { ...state.users, [alice.username]: { ...alice, ownLikes: [alice.ownLikes[1]] } }
          })
        })
      })
    })
  })
})
