import { connect } from 'react-redux'

import FollowButtonComponent from './follow-button.component'
import { followUser, unFollowUser } from '../../store/actions'
import { amIFollowing, isProfileOfCurrentUser } from '../../store/selectors'

const mapStateToProps = (state, ownProps) => {
  const { userProfile } = ownProps
  return {
    following: amIFollowing(userProfile.username)(state),
    isProfileOfCurrentUser: isProfileOfCurrentUser(userProfile)(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFollowClicked: (e, username) => {
      e.stopPropagation()
      dispatch(followUser(username))
    },
    onUnFollowClicked: (e, username) => {
      e.stopPropagation()
      dispatch(unFollowUser(username))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FollowButtonComponent)
