import React, { Component } from 'react'
import './app.css'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import routes from './routes'
import { initMemoDashClient } from './store/actions'
import ErrorBoundaryComponent from './components/error/error-boundary.component'

export class AppComponent extends Component {
  async componentDidMount() {
    await this.props.init()
  }

  render() {
    return <ErrorBoundaryComponent>{routes}</ErrorBoundaryComponent>
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: !!state.user.currentUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    init: () => {
      dispatch(initMemoDashClient())
    }
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AppComponent)
)
