import { connect } from 'react-redux'
import ProfileViewComponent from './profile-view.component'
import { getMemosForUser, getUser } from '../../store/actions'
import { getCurrentUser } from '../../store/selectors/user.selector'

const mapStateToProps = (state, ownProps) => {
  const user = getCurrentUser(state)

  if (user) {
    return {
      profile: user.profile,
      memos: user.memos
    }
  } else {
    return {}
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUser: username => {
      dispatch(getUser(username))
    },
    getMemosForUser: username => {
      dispatch(getMemosForUser(username))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileViewComponent)
