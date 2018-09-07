import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import ProfileOverviewComponent from './profile-overview.component'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    onGoToProfileClicked: username => {
      dispatch(push(`/profile/${username}`))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileOverviewComponent)
