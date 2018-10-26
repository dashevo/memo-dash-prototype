import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import appReducer from './reducers'
import { AuthActionTypes } from './actions'

const history = createBrowserHistory({ basename: process.env.PUBLIC_URL })
const middlewares = [routerMiddleware(history), thunk, logger]
const initialState = {}

const logoutReducer = (state, action) => {
  if (action.type === AuthActionTypes.LOGOUT_SUCCESSFULL) {
    state = { ...initialState, root: { ...state.root } }
  }

  return appReducer(state, action)
}

const store = createStore(
  connectRouter(history)(logoutReducer),
  initialState,
  compose(composeWithDevTools(applyMiddleware(...middlewares)))
)

if (module.hot) {
  module.hot.accept('./reducers', () => {
    store.replaceReducer(connectRouter(history)(appReducer))
  })
}

export { store, history }
