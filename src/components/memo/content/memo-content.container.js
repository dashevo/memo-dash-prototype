import { connect } from "react-redux"
import { push } from "connected-react-router"

import MemoContentComponent from "./memo-content.component"
import { editMemo } from "../../../store/actions"
import {
  getCurrentUser,
  getUserByUserId,
  isMemoOfCurrentUser
} from "../../../store/selectors"

const mapStateToProps = (state, ownProps) => {
  const { memo } = ownProps

  return {
    memoUser: getUserByUserId(memo.$meta.userId)(state),
    currentUser: getCurrentUser(state),
    showEdit: isMemoOfCurrentUser(memo)(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGoToProfileClicked: username => {
      dispatch(push(`/profile/${username}`))
    },
    onEditClicked: (username, memoId, message) => {
      dispatch(editMemo(username, memoId, message))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MemoContentComponent)
