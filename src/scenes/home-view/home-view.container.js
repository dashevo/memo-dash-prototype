import { connect } from 'react-redux'
import HomeViewComponent from './home-view.component'

const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeViewComponent)
