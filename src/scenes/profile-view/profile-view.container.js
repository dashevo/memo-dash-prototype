import { connect } from 'react-redux'
import ProfileViewComponent from './profile-view.component'
import { getMemosForUser, getUser } from '../../store/actions'
import { filterUser } from '../../lib/helpers'

const mapStateToProps = (state, ownProps) => {
  const {
    match: {
      params: { username }
    }
  } = ownProps

  const {
    user: { users }
  } = state

  const user = filterUser(username, users)

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
