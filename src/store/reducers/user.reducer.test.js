import reducer, { initialState } from './user.reducer'
import { loginError, loginSuccessfull, logoutError, logoutSuccessfull } from '../actions'
import { userProfileReceived, ownMemosReceived, allMemosReceived } from '../actions/user.actions'

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
      const userName = 'UserName'
      expect(reducer([], loginSuccessfull(userName))).toEqual({
        currentUser: {
          userName: userName
        },
        isLoggedIn: true,
        authError: undefined
      })
    })

    it('should handle LOGOUT_SUCCESSFULL', () => {
      expect(reducer([], logoutSuccessfull())).toEqual({
        currentUser: {
          userName: undefined,
          profile: undefined
        },
        isLoggedIn: false,
        authError: undefined
      })
    })

    it('should handle USER_PROFILE_RECEIVED', () => {
      const profile = 'Profile'
      expect(reducer([], userProfileReceived(profile))).toEqual({
        currentUser: {
          profile: profile
        }
      })
    })

    it('should handle OWN_MEMOS_RECEIVED', () => {
      const memos = 'Memos'
      expect(reducer([], ownMemosReceived(memos))).toEqual({
        currentUser: {
          memos
        }
      })
    })

    it('should handle ALL_MEMOS_RECEIVED', () => {
      const memos = 'Memos'
      expect(reducer([], allMemosReceived(memos))).toEqual({
        memos
      })
    })
  })
})
