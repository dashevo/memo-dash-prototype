import { connect } from 'react-redux'
import ProfileViewComponent from './profile-view.component'
import { getMemosForUser, getUser } from '../../store/actions'

const mapStateToProps = (state, ownProps) => {
  const {
    match: {
      params: { username }
    }
  } = ownProps

  const {
    user: { users }
  } = state

  const filteredUsers = users.filter(user => user.username === username)

  if (filteredUsers.length > 0) {
    return {
      profile: filteredUsers[0].profile,
      memos: filteredUsers[0].memos
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
