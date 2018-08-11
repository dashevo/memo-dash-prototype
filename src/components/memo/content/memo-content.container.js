import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import MemoContentComponent from './memo-content.component'
import { likeMemo, removeLike, replyToMemo } from '../../../store/actions'
import { getCurrentUser } from '../../../store/selectors'

const mapStateToProps = state => {
  return {
    currentUser: getCurrentUser(state)
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
)(MemoContentComponent)
