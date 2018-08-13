import React from 'react'
import { Route, Switch } from 'react-router'

import { LoginViewContainer, HomeViewContainer, ProfileViewContainer } from '../scenes/'
import PrivateRoute from '../components/private-route/private-route.container'
import NoMatch from '../components/no-match/no-match.component'
import HeaderContainer from '../components/header/header.container'
import FooterContainer from '../components/footer/footer.container'

const withHeader = WrappedComponent => props => (
  <React.Fragment>
    <HeaderContainer />
    <WrappedComponent {...props} />
  </React.Fragment>
)

const withFooter = WrappedComponent => props => (
  <React.Fragment>
    <WrappedComponent {...props} />
    <FooterContainer />
  </React.Fragment>
)

const routes = (
  <div>
    <Switch>
      <Route exact path="/" component={withFooter(LoginViewContainer)} />
      <Route path="/login" component={withFooter(LoginViewContainer)} />
      <PrivateRoute path="/home" component={withHeader(withFooter(HomeViewContainer))} />
      <PrivateRoute path="/profile/:username" component={withHeader(withFooter(ProfileViewContainer))} />
      <Route component={NoMatch} />
    </Switch>
  </div>
)

export default routes
