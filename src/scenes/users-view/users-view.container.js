import { connect } from 'react-redux'
import UsersViewComponent from './users-view.component'
import { getUsers as getUsersFromState, getCurrentUsername } from '../../store/selectors'
import { getAllUsers } from '../../store/actions'

const mapStateToProps = state => {
  return {
    users: getUsersFromState(state),
    currentUser: getCurrentUsername(state)
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
