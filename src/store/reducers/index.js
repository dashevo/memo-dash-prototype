import rootReducer from './root.reducer'
import userReducer from './user.reducer'

import { combineReducers } from 'redux'

export default combineReducers({
  root: rootReducer,
  user: userReducer
})
