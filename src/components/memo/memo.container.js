import { connect } from 'react-redux'

import MemoComponent from './memo.component'
import { openMemoModal, getMemoReplies } from '../../store/actions'
import { getMemosByCombinedIds } from '../../store/selectors'

const mapStateToProps = (state, ownProps) => {
  const { memo, showReplies } = ownProps

  if (!memo) return {}

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
