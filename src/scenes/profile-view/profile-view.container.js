import { connect } from 'react-redux'
import ProfileViewComponent from './profile-view.component'
import { getUser } from '../../store/actions'
import { getUserProfile } from '../../store/selectors'

const mapStateToProps = (state, ownProps) => {
  const {
    match: {
      params: { username }
    }
  } = ownProps

  return {
    username,
    profile: getUserProfile(username)(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUser: username => {
      dispatch(getUser(username))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileViewComponent)
