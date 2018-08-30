import { AuthActionTypes } from '../actions'
import { UserActionTypes } from '../actions/user.actions'
import { getCurrentUser } from '../selectors'

export const initialState = {
  currentUser: undefined,
  memoIds: undefined,
  authError: undefined,
  users: undefined
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
    case UserActionTypes.USER_RECEIVED: {
      const users = { ...state.users }
      const receivedUser = action.payload

      users[receivedUser.username] = { ...users[receivedUser.username], ...receivedUser }

      return {
        ...state,
        users
      }
    }
    case UserActionTypes.USERS_RECEIVED: {
      const users = { ...state.users }
      const receivedUsers = action.payload

      if (receivedUsers) {
        receivedUsers.forEach(
          receivedUser =>
            (users[receivedUser.username] = { ...users[receivedUser.username], ...receivedUser })
        )
      }

      return {
        ...state,
        users
      }
    }
    case UserActionTypes.USER_UPDATED: {
      const users = { ...state.users }
      const { username, props } = action.payload

      if (users[username]) {
        const updatedUser = { ...users[username], ...props }
        return {
          ...state,
          users: { ...state.users, [username]: updatedUser }
        }
      } else {
        return state
      }
    }

    case UserActionTypes.LIKE_REMOVED:
      const user = getCurrentUser({ user: state })
      if (user) {
        const updatedUser = { ...user, ownLikes: user.ownLikes.filter(like => like.idx !== action.payload) }
        return {
          ...state,
          users: { ...state.users, [updatedUser.username]: updatedUser }
        }
      } else {
        return state
      }

    default:
      return state
  }
}
