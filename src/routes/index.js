import React from 'react'
import { Route, Switch } from 'react-router'
import PrivateRoute from '../components/private-route/private-route.container'
import { LoginViewContainer, HomeViewContainer, ProfileViewContainer } from '../scenes/'
import {} from '../scenes/'
import { NoMatch } from '../components'
import HeaderContainer from '../components/header/header.container'

const withHeader = WrappedComponent => props => (
  <React.Fragment>
    <HeaderContainer />
    <WrappedComponent {...props} />
  </React.Fragment>
)

const routes = (
  <div>
    <Switch>
      <Route exact path="/" component={LoginViewContainer} />
      <Route path="/login" component={LoginViewContainer} />
      <PrivateRoute path="/home" component={withHeader(HomeViewContainer)} />
      <PrivateRoute path="/profile" component={withHeader(ProfileViewContainer)} />
      <Route component={NoMatch} />
    </Switch>
  </div>
)

export default routes
