import { connect } from 'react-redux'
import ProfileViewComponent from './profile-view.component'
import { getMemosForUser, getUser, getFollowersForUser, getFollowingForUser } from '../../store/actions'
import {
  getUserProfile,
  getUserMemos,
  getPathname,
  getUserFollowers,
  getUserFollowing
} from '../../store/selectors'
import { push } from 'connected-react-router'

const mapStateToProps = (state, ownProps) => {
  const {
    match: {
      params: { username }
    }
  } = ownProps

  return {
    username,
    profile: getUserProfile(username)(state),
    memos: getUserMemos(username)(state),
    followers: getUserFollowers(username)(state),
    following: getUserFollowing(username)(state),
    pathname: getPathname(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUser: username => {
      dispatch(getUser(username))
    },
    getMemosForUser: username => {
      dispatch(getMemosForUser(username))
    },
    onMemosClicked: (memos, username) => {
      if (!memos) dispatch(getMemosForUser(username))
      dispatch(push(`/profile/${username}/memos`))
    },
    onFollowersClicked: (followers, username) => {
      if (!followers) dispatch(getFollowersForUser(username))
      dispatch(push(`/profile/${username}/followers`))
    },
    onFollowingClicked: (following, username) => {
      if (!following) dispatch(getFollowingForUser(username))
      dispatch(push(`/profile/${username}/following`))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileViewComponent)
