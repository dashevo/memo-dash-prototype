import { connect } from 'react-redux'
import HomeViewComponent from './home-view.component'

const mapStateToProps = state => {
  return {
    userName: state.user.currentUser.userName
  }
}

const mapDispatchToProps = dispatch => {
  return {
    
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeViewComponent)
