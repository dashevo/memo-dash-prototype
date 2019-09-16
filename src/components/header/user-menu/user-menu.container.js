import { push } from "connected-react-router"

import { logout } from "../../../store/actions"

import UserMenuComponent from "./user-menu.component"
import {
  getCurrentUserName,
  getUserProfile
} from "../../../store/selectors/user.selector"
import { connect } from "react-redux"

const mapStateToProps = state => {
  const username = getCurrentUserName(state)
  const profile = getUserProfile(username)(state)
  return {
    username,
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
