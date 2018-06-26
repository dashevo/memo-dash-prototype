import React from 'react'
import { Route, Redirect } from 'react-router'

const PrivateRouteComponent = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      rest.isLoggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/',
            state: { from: props.location }
          }}
        />
      )
    }
  />
)

export default PrivateRouteComponent
