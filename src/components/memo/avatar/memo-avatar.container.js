import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import MemoAvatarComponent from './memo-avatar.component'
import { isMemoOfCurrentUser, getAvatarUrl } from '../../../store/selectors'

const mapStateToProps = (state, ownProps) => {
  const { memo } = ownProps
  return {
    isMemoOfCurrentUser: isMemoOfCurrentUser(memo)(state),
    avatarUrl: getAvatarUrl(memo.username)(state)
  }
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
)(MemoAvatarComponent)
