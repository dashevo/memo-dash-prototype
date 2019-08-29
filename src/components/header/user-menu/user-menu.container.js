import { push } from "connected-react-router"

import { logout } from "../../../store/actions"

import UserMenuComponent from "./user-menu.component"
import {
  getCurrentUser,
  getUserProfile
} from "../../../store/selectors/user.selector"
import { connect } from "react-redux"

const mapStateToProps = state => {
  const user = getCurrentUser(state)
  const profile = getUserProfile(user.regtxid)(state)
  return {
    username: user.uname,
    avatarUrl: profile.avatarUrl
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
