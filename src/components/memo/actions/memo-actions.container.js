import { connect } from 'react-redux'

import MemoActionsComponent from './memo-actions.component'
import { likeMemo, removeLike, replyToMemo } from '../../../store/actions'
import { isMemoLikedByCurrentUser, isMemoOfCurrentUser } from '../../../store/selectors'

const mapStateToProps = (state, ownProps) => {
  return {
    likedByCurrentUser: isMemoLikedByCurrentUser(ownProps.memo)(state),
    isMemoOfCurrentUser: isMemoOfCurrentUser(ownProps.memo)(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLikeMemoClicked: (username, memoId) => {
      dispatch(likeMemo(username, memoId))
    },
    onRemoveLikeClicked: (username, memoId) => {
      dispatch(removeLike(username, memoId))
    },
    onReplyClicked: (username, memoId, message) => {
      dispatch(replyToMemo(username, memoId, message))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MemoActionsComponent)
