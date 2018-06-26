import React from 'react'
import { Route, Switch } from 'react-router'
import PrivateRoute from '../components/private-route/private-route.container'
import { LoginViewContainer } from '../scenes/'
import { HomeViewContainer } from '../scenes/'
import { NoMatch } from '../components'

const routes = (
  <div>
    <Switch>
      <Route exact path="/" component={LoginViewContainer} />
      <Route path="/login" component={LoginViewContainer} />
      <PrivateRoute path="/home" component={HomeViewContainer} />
      <Route component={NoMatch} />
    </Switch>
  </div>
)

export default routes
