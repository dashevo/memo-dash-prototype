import React from 'react'
import { Route, Switch, Redirect } from 'react-router'

import { LoginViewContainer, HomeViewContainer, ProfileViewContainer } from '../scenes/'
import PrivateRoute from '../components/private-route/private-route.container'
import NoMatch from '../components/no-match/no-match.component'
import HeaderContainer from '../components/header/header.container'
import UsersViewContainer from '../scenes/users-view/users-view.container'

const withHeader = WrappedComponent => props => (
  <div style={{ backgroundColor: '#f1f1f1' }}>
    <HeaderContainer />
    <WrappedComponent {...props} />
  </div>
)

const routes = (
  <div>
    <Switch>
      <Route exact path="/" component={LoginViewContainer} />
      <Route path="/login" component={LoginViewContainer} />
      <PrivateRoute path="/home" component={withHeader(HomeViewContainer)} />
      <PrivateRoute path="/users" component={withHeader(UsersViewContainer)} />
      <Redirect exact from="/profile/:username" to="/profile/:username/memos" />
      <PrivateRoute path="/profile/:username/*" component={withHeader(ProfileViewContainer)} />
      <Route component={NoMatch} />
    </Switch>
  </div>
)

export default routes
