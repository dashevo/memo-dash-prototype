import { AuthActionTypes } from '../actions'
import { UserActionTypes } from '../actions/user.actions'
import { getUserByUsername, getCurrentUser } from '../selectors/users.selector'

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
      return initialState
    case UserActionTypes.USER_RECEIVED: {
      const { payload: newUser } = action
      const existingUser = getUserByUsername(newUser.username)({ user: state })

      let user
      if (existingUser) {
        user = { ...existingUser, ...newUser }
      } else {
        user = newUser
      }

      return {
        ...state,
        users: { ...state.users, [user.username]: user }
      }
    }
    case UserActionTypes.USER_UPDATED: {
      const { username, props } = action.payload
      const existingUser = getUserByUsername(username)({ user: state })

      if (existingUser) {
        const updatedUser = { ...existingUser, ...props }
        return {
          ...state,
          users: { ...state.users, [updatedUser.username]: updatedUser }
        }
      } else {
        return state
      }
    }
    case UserActionTypes.MEMOS_FOR_USER_RECEIVED: {
      const { username, memos } = action.payload
      const user = getUserByUsername(username)({ user: state })

      if (user) {
        const updatedUser = { ...user, memos }

        return {
          ...state,
          users: { ...state.users, [updatedUser.username]: updatedUser }
        }
      } else {
        return {
          ...state,
          users: { ...state.users, [username]: { username, memos } }
        }
      }
    }
    case UserActionTypes.MEMO_UPDATED:
      const { username, idx } = action.payload

      return {
        ...state,
        allMemos: [
          ...state.allMemos.map(
            memo => (memo.username === username && memo.idx === idx ? action.payload : memo)
          )
        ]
      }

    case UserActionTypes.ALL_MEMOS_RECEIVED:
      return {
        ...state,
        allMemos: action.payload
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
