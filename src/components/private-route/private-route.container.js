import { connect } from 'react-redux'
import PrivateRouteComponent from './private-route.component'

const mapStateToProps = state => {
  return {
    isLoggedIn: !!state.user.currentUser
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrivateRouteComponent)
