import { AuthActionTypes } from '../actions'
import { UserActionTypes } from '../actions/user.actions'

export const initialState = {
  currentUser: undefined,
  memos: undefined,
  authError: undefined
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
        currentUser: {
          ...state.currentUser,
          userName: action.payload
        }
      }

    case AuthActionTypes.LOGOUT_SUCCESSFULL:
      return {
        ...state,
        authError: undefined,
        currentUser: undefined
      }
    case UserActionTypes.USER_PROFILE_RECEIVED:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          profile: action.payload
        }
      }
    case UserActionTypes.OWN_MEMOS_RECEIVED:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          memos: action.payload
        }
      }
    case UserActionTypes.ALL_MEMOS_RECEIVED:
      return {
        ...state,
        memos: action.payload
      }
    default:
      return state
  }
}
