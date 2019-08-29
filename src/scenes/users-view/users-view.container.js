import { connect } from "react-redux"
import UsersViewComponent from "./users-view.component"
import {
  getUsers as getUsersFromState,
  getCurrentUserId
} from "../../store/selectors"
import { getAllUsers } from "../../store/actions"

const mapStateToProps = state => {
  return {
    users: getUsersFromState(state),
    currentUser: getCurrentUserId(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllUsers: () => {
      dispatch(getAllUsers())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersViewComponent)
