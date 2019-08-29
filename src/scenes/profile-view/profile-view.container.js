import { connect } from "react-redux"
import ProfileViewComponent from "./profile-view.component"
import { getUser, updateProfile } from "../../store/actions"
import {
  getUserProfileByUserName,
  isProfileOfCurrentUser
} from "../../store/selectors"

const mapStateToProps = (state, ownProps) => {
  const {
    match: {
      params: { username }
    }
  } = ownProps

  const profile = getUserProfileByUserName(username)(state)

  return {
    username,
    profile,
    isProfileOfCurrentUser: isProfileOfCurrentUser(profile)(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUser: username => {
      dispatch(getUser(username))
    },
    onEditSubmitted: bio => dispatch(updateProfile(bio))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileViewComponent)
