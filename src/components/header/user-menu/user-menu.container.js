import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import { logout } from '../../../store/actions'

import UserMenuComponent from './user-menu.component'

const mapStateToProps = state => {
  return {
    avatar: state.user.currentUser.profile.avatarUrl,
    username: state.user.currentUser.profile.username,
    location: state.router.location.pathname
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onProfileClicked: () => {
      dispatch(push('/profile'))
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
