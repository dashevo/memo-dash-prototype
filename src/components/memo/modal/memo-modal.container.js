import { connect } from 'react-redux'

import MemoModalComponent from './memo-modal.component'
import { closeMemoModal } from '../../../store/actions/memo-modal.actions'
import { isMemoModalOpened, getOpenedMemo } from '../../../store/selectors/memo-modal.selector'

const mapStateToProps = state => {
  return { opened: isMemoModalOpened(state), memo: getOpenedMemo(state) }
}

const mapDispatchToProps = dispatch => {
  return { onModalCloseClicked: () => dispatch(closeMemoModal()) }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MemoModalComponent)
