import { AuthActionTypes } from '../actions'
import { UserActionTypes } from '../actions/user.actions'
import { filterUser } from '../../lib/helpers'

export const initialState = {
  currentUser: undefined,
  allMemos: undefined,
  authError: undefined,
  users: []
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
        currentUser: action.payload
      }

    case AuthActionTypes.LOGOUT_SUCCESSFULL:
      return {
        ...state,
        authError: undefined,
        currentUser: undefined,
        users: []
      }
    case UserActionTypes.USER_PROFILE_RECEIVED: {
      const { payload: profile } = action
      const user = filterUser(profile.username, state.users)

      if (user) {
        const updatedUser = { ...user, username: profile.username, profile }
        return {
          ...state,
          users: [...state.users.filter(user => user.username !== profile.username), updatedUser]
        }
      } else {
        return {
          ...state,
          users: [...state.users, { username: profile.username, profile }]
        }
      }
    }
    case UserActionTypes.MEMOS_FOR_USER_RECEIVED: {
      const { username, memos } = action.payload
      const user = filterUser(username, state.users)

      if (user) {
        const updatedUser = { ...user, memos }

        return {
          ...state,
          users: [...state.users.filter(user => user.username !== username), updatedUser]
        }
      } else {
        return {
          ...state,
          users: [...state.users, { username, memos }]
        }
      }
    }
    case UserActionTypes.ALL_MEMOS_RECEIVED:
      return {
        ...state,
        allMemos: action.payload
      }
    default:
      return state
  }
}
