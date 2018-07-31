import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import MemoComponent from './memo.component'
import { likeMemo, removeLike, replyToMemo } from '../../store/actions/user.actions'
import { isMemoLikedByUsername } from '../../lib/helpers'

const mapStateToProps = (state, ownProps) => {
  const {
    user: { currentUser, users }
  } = state

  return {
    currentUser,
    likedByMe: isMemoLikedByUsername(ownProps.memo, currentUser, users)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGoToProfileClicked: username => {
      dispatch(push(`/profile/${username}`))
    },
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
)(MemoComponent)
