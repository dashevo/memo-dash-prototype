import { connect } from 'react-redux'
import ProfileViewComponent from './profile-view.component'

const mapStateToProps = state => {
  return {
    profile: state.user.currentUser.profile
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileViewComponent)
