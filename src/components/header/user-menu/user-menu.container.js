import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import { logout } from '../../../store/actions'

import UserMenuComponent from './user-menu.component'

const mapStateToProps = state => {
  const {
    currentUser: { profile }
  } = state.user
  return {
    avatar: profile ? profile.avatarUrl : undefined,
    username: profile ? profile.username : undefined,
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
