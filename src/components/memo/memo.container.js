import { connect } from 'react-redux'

import MemoComponent from './memo.component'
import { openMemoModal, getMemoReplies, closeMemoModal } from '../../store/actions'
import { getMemosByCombinedIds, isMemoOfCurrentUser } from '../../store/selectors'

const mapStateToProps = (state, ownProps) => {
  const { memo, showReplies } = ownProps

  if (!memo) return {}

  let replies = undefined
  if (showReplies) {
    replies = getMemosByCombinedIds(memo.replyIds)(state)
  }

  return { replies, showDelete: isMemoOfCurrentUser(memo)(state) }
}

const mapDispatchToProps = dispatch => {
  return {
    onModalOpenClicked: memo => dispatch(openMemoModal(memo)),
    closeModal: () => dispatch(closeMemoModal()),
    onLoadReplies: memo => dispatch(getMemoReplies(memo.username, memo.idx))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MemoComponent)
