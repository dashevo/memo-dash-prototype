import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import HeaderComponent from './header.component'
import { getPathname } from '../../store/selectors'

const mapStateToProps = state => {
  return {
    location: getPathname(state)
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
