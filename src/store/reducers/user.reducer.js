import { AuthActionTypes, MemoActionTypes } from "../actions"
import { UserActionTypes } from "../actions/user.actions"

export const initialState = {
  currentUser: undefined,
  memoIds: undefined,
  authError: undefined,
  users: undefined
}

const getCurrentUser = state => state.users[state.currentUser]

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

      users[receivedUser.username] = {
        ...users[receivedUser.username],
        ...receivedUser
      }

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
            (users[receivedUser.username] = {
              ...users[receivedUser.username],
              ...receivedUser
            })
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

    case MemoActionTypes.LIKE_ADDED: {
      const user = getCurrentUser(state)
      if (user) {
        const likes = action.payload
        const updatedUser = {
          ...user,
          likes,
          profile: { ...user.profile, likesCount: likes.length }
        }
        return {
          ...state,
          users: { ...state.users, [updatedUser.uname]: updatedUser }
        }
      } else {
        return state
      }
    }
    case MemoActionTypes.LIKE_REMOVED: {
      const user = getCurrentUser(state)
      if (user) {
        const likes = user.likes.filter(like => like.idx !== action.payload)
        const updatedUser = {
          ...user,
          likes,
          profile: { ...user.profile, likesCount: likes.length }
        }
        return {
          ...state,
          users: { ...state.users, [updatedUser.uname]: updatedUser }
        }
      } else {
        return state
      }
    }
    case MemoActionTypes.MEMO_DELETED: {
      const user = getCurrentUser(state)
      if (user) {
        const updatedUser = {
          ...user,
          memoIds: user.memoIds.filter(memoId => memoId !== action.payload)
        }
        return {
          ...state,
          users: { ...state.users, [updatedUser.uname]: updatedUser }
        }
      } else {
        return state
      }
    }

    default:
      return state
  }
}
