import rootReducer from "./root.reducer"
import userReducer from "./user.reducer"
import memoReducer from "./memo.reducer"
import memoModalReducer from "./memo-modal.reducer"

import { combineReducers } from "redux"

export default combineReducers({
  root: rootReducer,
  user: userReducer,
  memo: memoReducer,
  memoModal: memoModalReducer
})
