import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
const history = createBrowserHistory()

const createStoreInstance = initialState => {
  const middlewares = [routerMiddleware(history), thunk, logger]

  return createStore(
    connectRouter(history)(rootReducer),
    initialState,
    compose(composeWithDevTools(applyMiddleware(...middlewares)))
  )
}
export { createStoreInstance as createStore, history }
