import rootReducer from './root.reducer'
import loginReducer from './login.reducer'

import { combineReducers } from 'redux'

export default combineReducers({
  root: rootReducer,
  user: loginReducer
})
