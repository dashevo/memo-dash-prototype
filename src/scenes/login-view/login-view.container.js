import { connect } from 'react-redux'
import './styles.css'
import LoginViewComponent from './login-view.component'
import { login } from '../../store/actions'

const mapStateToProps = state => {
  return {
    authError: state.user.authError
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoginClick: username => {
      dispatch(login(username))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginViewComponent)
