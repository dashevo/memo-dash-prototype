import { connect } from 'react-redux'
import PrivateRouteComponent from './private-route.component'
import { isAuthenticated } from '../../store/selectors/user.selector'

const mapStateToProps = state => {
  return {
    isLoggedIn: isAuthenticated(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrivateRouteComponent)
