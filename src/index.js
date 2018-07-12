import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import 'semantic-ui-css/semantic.min.css'
import registerServiceWorker from './registerServiceWorker'
import { createStore, history } from './store'
import App from './app'
import { ConnectedRouter } from 'connected-react-router'
import { AppContainer } from 'react-hot-loader'

const store = createStore()

console.log('CREATE_STORE', store.getState())

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Component />
        </ConnectedRouter>
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  )
}

registerServiceWorker()

render(App)

if (module.hot) {
  module.hot.accept('./app', () => {
    render(App)
  })
}
