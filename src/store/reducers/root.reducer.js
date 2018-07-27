import { InitActionTypes } from '../actions'

export const initialState = {
  memoDashLib: undefined
}

export default (state = initialState, action) => {
  switch (action.type) {
    case InitActionTypes.INIT_FINISHED:
      return {
        ...state,
        memoDashLib: action.payload
      }
    default:
      return state
  }
}
