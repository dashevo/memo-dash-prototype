import { AuthActionTypes } from '../actions'
import { UserActionTypes } from '../actions/user.actions'

export const initialState = {
  currentUser: {
    userName: undefined,
    profile: undefined
  },
  authError: undefined,
  isLoggedIn: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case AuthActionTypes.LOGIN_ERROR:
    case AuthActionTypes.LOGOUT_ERROR:
      return {
        ...state,
        authError: action.payload
      }

    case AuthActionTypes.LOGIN_SUCCESSFULL:
      return {
        ...state,
        authError: undefined,
        isLoggedIn: true,
        currentUser: {
          ...state.currentUser,
          userName: action.payload
        }
      }

    case AuthActionTypes.LOGOUT_SUCCESSFULL:
      return {
        ...state,
        authError: undefined,
        isLoggedIn: false,
        currentUser: {
          userName: undefined,
          profile: undefined
        }
      }
    case UserActionTypes.USER_PROFILE_RECEIVED:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          profile: action.payload
        }
      }
    default:
      return state
  }
}
