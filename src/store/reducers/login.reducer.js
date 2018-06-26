import { LoginActionTypes } from '../actions'

export const initialState = {
  currentUser: {
    userName: undefined,
    myContacts: [],
    searchResults: []
  },
  loginError: undefined,
  isLoggedIn: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LoginActionTypes.LOGIN_ERROR:
      return {
        ...state,
        loginError: action.payload
      }

    case LoginActionTypes.LOGIN_SUCCESSFULL:
      return {
        ...state,
        loginError: undefined,
        isLoggedIn: true,
        currentUser: {
          ...state.currentUser,
          userName: action.payload
        }
      }
    default:
      return state
  }
}
