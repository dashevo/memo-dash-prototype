import React from 'react'
import { Route, Switch } from 'react-router'
import { LoginViewContainer } from '../scenes/'
import { NoMatch } from '../components'

const routes = (
  <div>
    <Switch>
      <Route exact path="/" component={LoginViewContainer} />
      <Route path="/login" component={LoginViewContainer} />
      <Route component={NoMatch} />
    </Switch>
  </div>
)

export default routes
