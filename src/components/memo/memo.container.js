import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import MemoComponent from './memo.component'
import { likeMemo, removeLike, replyToMemo } from '../../store/actions/user.actions'
import { isMemoLikedByCurrentUser } from '../../store/selectors/memos.selector'

const mapStateToProps = (state, ownProps) => {
  const {
    user: { currentUser }
  } = state

  return {
    currentUser,
    likedByMe: isMemoLikedByCurrentUser(ownProps.memo)(state)
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
