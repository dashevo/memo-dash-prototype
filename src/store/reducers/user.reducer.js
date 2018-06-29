import { AuthActionTypes } from '../actions'
import { UserActionTypes } from '../actions/user.actions'

export const initialState = {
  currentUser: {
    userName: undefined,
    profile: undefined
  },
  loginError: undefined,
  isLoggedIn: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case AuthActionTypes.LOGIN_ERROR:
      return {
        ...state,
        loginError: action.payload
      }

    case AuthActionTypes.LOGIN_SUCCESSFULL:
      return {
        ...state,
        loginError: undefined,
        isLoggedIn: true,
        currentUser: {
          ...state.currentUser,
          userName: action.payload
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
