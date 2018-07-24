import { connect } from 'react-redux'

import MemoComponent from './memo.component'
import { push } from 'connected-react-router'

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    onGoToProfileClicked: username => {
      dispatch(push(`/profile/${username}`))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MemoComponent)
