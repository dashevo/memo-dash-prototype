import { connect } from 'react-redux'

import MemoComponent from './memo.component'
import { openMemoModal, getMemoReplies } from '../../store/actions'
import { getMemosByCombinedIds } from '../../store/selectors'

const mapStateToProps = (state, ownProps) => {
  if (ownProps.showReplies) {
    return { replies: getMemosByCombinedIds(ownProps.memo.replyIds)(state) }
  } else return {}
}

const mapDispatchToProps = dispatch => {
  return {
    onModalOpenClicked: memo => dispatch(openMemoModal(memo)),
    onLoadReplies: memo => dispatch(getMemoReplies(memo.username, memo.idx))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MemoComponent)
