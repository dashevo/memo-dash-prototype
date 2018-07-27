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
      return initialState
    case UserActionTypes.USER_RECEIVED: {
      const { payload: newUser } = action
      const existingUser = filterUser(newUser.username, state.users)

      if (existingUser) {
        const updatedUser = { ...existingUser, ...newUser }
        return {
          ...state,
          users: [...state.users.map(user => (user.username === updatedUser.username ? updatedUser : user))]
        }
      } else {
        return {
          ...state,
          users: [...state.users, newUser]
        }
      }
    }
    case UserActionTypes.USER_UPDATED: {
      const { username, props } = action.payload
      const existingUser = filterUser(username, state.users)

      if (existingUser) {
        const updatedUser = { ...existingUser, ...props }
        return {
          ...state,
          users: [...state.users.map(user => (user.username === username ? updatedUser : user))]
        }
      } else {
        return state
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
      const user = filterUser(state.currentUser, state.users)
      if (user) {
        const updatedUser = { ...user, ownLikes: user.ownLikes.filter(like => like.idx !== action.payload) }
        return {
          ...state,
          users: [...state.users.map(user => (user.username === state.currentUser ? updatedUser : user))]
        }
      } else {
        return state
      }
    default:
      return state
  }
}
