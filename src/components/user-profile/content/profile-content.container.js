import { connect } from "react-redux"
import {
  getMemosForUser,
  getFollowersForUser,
  getFollowingForUser,
  getLikedMemosForUser
} from "../../../store/actions"
import {
  getUserMemos,
  getPathname,
  getUserFollowers,
  getUserFollowing,
  getUserLikedMemos,
  getUserByUserId,
  getUserIdByUserName
} from "../../../store/selectors"
import { push } from "connected-react-router"
import ProfileContentComponent from "./profile-content.component"

const mapStateToProps = (state, ownProps) => {
  const {
    profile: { username }
  } = ownProps

  return {
    username,
    memos: getUserMemos(username)(state),
    followers: getUserFollowers(username)(state),
    following: getUserFollowing(username)(state),
    likedMemos: getUserLikedMemos(username)(state),
    pathname: getPathname(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onMemosClicked: (memos, username) => {
      if (!memos) {
        const userId = getUserIdByUserName(username)
        dispatch(getMemosForUser(userId))
      }

      dispatch(push(`/profile/${username}/memos`))
    },
    onFollowersClicked: (followers, username) => {
      if (!followers) dispatch(getFollowersForUser(username))
      dispatch(push(`/profile/${username}/followers`))
    },
    onFollowingClicked: (following, username) => {
      if (!following) dispatch(getFollowingForUser(username))
      dispatch(push(`/profile/${username}/following`))
    },
    onLikedMemosClicked: (likedMemos, username) => {
      if (!likedMemos) dispatch(getLikedMemosForUser(username))
      dispatch(push(`/profile/${username}/likes`))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContentComponent)
