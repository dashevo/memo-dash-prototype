import reducer, { initialState } from './user.reducer'
import { loginError, loginSuccessfull } from '../actions'

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
    it('should handle LOGIN_ERROR', () => {
      const error = 'LoginError'
      expect(reducer([], loginError(error))).toEqual({ loginError: error })
    })

    it('should handle LOGIN_SUCESSFULL', () => {
      const userName = 'UserName'
      expect(reducer([], loginSuccessfull(userName))).toEqual({
        currentUser: {
          userName: userName
        },
        isLoggedIn: true,
        loginError: undefined
      })
    })
  })
})
