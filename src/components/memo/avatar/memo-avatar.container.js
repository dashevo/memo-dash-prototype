import { connect } from "react-redux"
import { push } from "connected-react-router"

import MemoAvatarComponent from "./memo-avatar.component"
import { isMemoOfCurrentUser, getAvatarUrl } from "../../../store/selectors"

const mapStateToProps = (state, ownProps) => {
  const { memo } = ownProps

  if (!memo) return {}

  return {
    isMemoOfCurrentUser: isMemoOfCurrentUser(memo)(state),
    avatarUrl: getAvatarUrl(memo.$meta.userId)(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGoToProfileClicked: (e, username) => {
      e.stopPropagation()
      dispatch(push(`/profile/${username}`))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MemoAvatarComponent)
