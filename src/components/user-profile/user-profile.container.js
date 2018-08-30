import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import UserProfileComponent from './user-profile.component'
import { followUser, unFollowUser } from '../../store/actions'
import { amIFollowing, isProfileOfCurrentUser } from '../../store/selectors'

const mapStateToProps = (state, ownProps) => {
  const {
    userProfile,
    userProfile: { username }
  } = ownProps
  return {
    following: amIFollowing(username)(state),
    isProfileOfCurrentUser: isProfileOfCurrentUser(userProfile)(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGoToProfileClicked: username => {
      dispatch(push(`/profile/${username}`))
    },
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
)(UserProfileComponent)
