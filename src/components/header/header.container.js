import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import HeaderComponent from './header.component'

const mapStateToProps = state => {
  return {
    location: state.router.location.pathname
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onHomeClicked: () => {
      dispatch(push('/home'))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderComponent)
