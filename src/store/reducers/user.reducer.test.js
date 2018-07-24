import reducer, { initialState } from './user.reducer'
import { loginError, loginSuccessfull, logoutError, logoutSuccessfull } from '../actions'
import { userProfileReceived, memosForUserReceived, allMemosReceived } from '../actions/user.actions'

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

    it('should handle USER_PROFILE_RECEIVED', () => {
      const profile = { username: 'Username' }
      expect(reducer(undefined, userProfileReceived(profile))).toEqual({
        ...initialState,
        users: [{ profile, username: profile.username }]
      })
    })

    it('should handle MEMOS_FOR_USER_RECEIVED', () => {
      const username = 'Username'
      const memos = 'Memos'
      expect(reducer(undefined, memosForUserReceived(username, memos))).toEqual({
        ...initialState,
        users: [{ username, memos }]
      })
    })

    it('should handle ALL_MEMOS_RECEIVED', () => {
      const allMemos = 'Memos'
      expect(reducer(undefined, allMemosReceived(allMemos))).toEqual({
        ...initialState,
        allMemos
      })
    })
  })
})
