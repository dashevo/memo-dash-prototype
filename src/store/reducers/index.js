import rootReducer from './root.reducer'
import userReducer from './user.reducer'
import memoModalReducer from './memo-modal.reducer'

import { combineReducers } from 'redux'

export default combineReducers({
  root: rootReducer,
  memoModal: memoModalReducer
})
