import { connect } from 'react-redux'
import './styles.css'
import LoginViewComponent from './login-view.component'
import { login } from '../../store/actions'

const mapStateToProps = state => {
  return {
    loginError: state.user.loginError
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
