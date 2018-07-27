import reducer, { initialState } from './user.reducer'
import { loginError, loginSuccessfull, logoutError, logoutSuccessfull, likeRemoved } from '../actions'
import { userReceived, allMemosReceived, memoUpdated } from '../actions/user.actions'
import { filterUser } from '../../lib/helpers'

jest.mock('../../lib/helpers')

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
      describe('should handle USER_RECEIVED', () => {
        it('for a new user', () => {
          const user = { username: undefined, ownLikes: [], profile: { avatarUrl: 'avatarUrl' } }
          expect(reducer(undefined, userReceived(user))).toEqual({
            ...initialState,
            users: [user]
          })
        })

        it('for an existing user', () => {
          const alice = filterUser('alice')
          const bob = filterUser('bob')
          const receivedUser = { ownLikes: [{}], ...alice }

          expect(reducer({ ...initialState, users: [alice, bob] }, userReceived(receivedUser))).toEqual({
            ...initialState,
            users: [receivedUser, bob]
          })
        })
      })
    })

    describe('Memos', () => {
      let allMemos
      beforeEach(() => {
        allMemos = [
          { idx: 1, username: 'Alice', memoText: 'Hello from Alice1', memoLikesCount: 0 },
          { idx: 2, username: 'Alice', memoText: 'Hello from Alice2', memoLikesCount: 1 },
          { idx: 1, username: 'Bob', memoText: 'Hello from Bob1', memoLikesCount: 0 },
          { idx: 2, username: 'Bob', memoText: 'Hello from Bob2', memoLikesCount: 1 }
        ]
      })

      it('should handle ALL_MEMOS_RECEIVED', () => {
        expect(reducer(undefined, allMemosReceived(allMemos))).toEqual({
          ...initialState,
          allMemos
        })
      })

      it('should handle MEMO_UPDATED', () => {
        const memo = { ...allMemos[2], memoLikesCount: 1 }
        const state = { ...initialState, allMemos }

        expect(reducer(state, memoUpdated(memo))).toEqual({
          ...initialState,
          allMemos: [allMemos[0], allMemos[1], memo, allMemos[3]]
        })
      })
    })

    describe('Likes', () => {
      describe('handle LIKE_REMOVED', () => {
        it('should return original state if no user found', () => {
          const state = 'state'
          expect(reducer(state, likeRemoved('1'))).toEqual(state)
        })

        it('should remove a like', () => {
          const alice = filterUser('alice')
          const state = {
            currentUser: alice.username,
            users: [alice]
          }

          expect(reducer(state, likeRemoved(1))).toEqual({
            ...state,
            users: [{ ...alice, ownLikes: [alice.ownLikes[1]] }]
          })
        })
      })
    })
  })
})
