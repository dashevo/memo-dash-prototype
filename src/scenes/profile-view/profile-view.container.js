import { connect } from 'react-redux'
import ProfileViewComponent from './profile-view.component'
import { getOwnMemos } from '../../store/actions'

const mapStateToProps = state => {
  return {
    profile: state.user.currentUser.profile,
    memos: state.user.currentUser.memos
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getOwnMemos: () => {
      dispatch(getOwnMemos())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileViewComponent)
