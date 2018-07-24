import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import { logout } from '../../../store/actions'

import UserMenuComponent from './user-menu.component'
import { filterUser } from '../../../lib/helpers'

const mapStateToProps = state => {
  const user = filterUser(state.user.currentUser, state.user.users)
  return {
    username: user.username,
    avatarUrl: user.profile.avatarUrl
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onProfileClicked: username => {
      dispatch(push(`/profile/${username}`))
    },
    onSignOutClicked: () => {
      dispatch(logout())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserMenuComponent)
