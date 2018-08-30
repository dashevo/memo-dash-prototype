import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import UserProfileComponent from './user-profile.component'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    onGoToProfileClicked: username => {
      dispatch(push(`/profile/${username}`))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfileComponent)
