import { push } from 'connected-react-router'
import { getUserProfile } from './user.actions'

const AuthActionTypes = {
  LOGIN_ERROR: 'LOGIN_ERROR',
  LOGIN_SUCCESSFULL: 'LOGIN_SUCCESSFULL',
  LOGOUT_ERROR: 'LOGOUT_ERROR',
  LOGOUT_SUCCESSFULL: 'LOGOUT_SUCCESSFULL'
}

const login = blockchainUsername => async (dispatch, getState) => {
  const {
    root: { memoDashLib }
  } = getState()
  if (!memoDashLib) {
    dispatch(loginError('MemoDashLib isnt initialized yet'))
    return
  }

  let blockchainUser = await memoDashLib.searchBlockchainUsers(blockchainUsername)
  if (!blockchainUser || blockchainUser.length === 0) {
    dispatch(loginError(`User ${blockchainUsername} not found on blockchain`))
    return
  }

  blockchainUser = blockchainUser[0]

  try {
    await memoDashLib.login({ blockchainUsername: blockchainUser.name })
    dispatch(loginSuccessfull(blockchainUser.name))
    dispatch(getUserProfile())
    dispatch(push('/home'))
  } catch (error) {
    dispatch(loginError(error.message))
  }
}

const loginError = message => ({ type: AuthActionTypes.LOGIN_ERROR, payload: message })
const loginSuccessfull = userName => ({ type: AuthActionTypes.LOGIN_SUCCESSFULL, payload: userName })

const logout = () => async (dispatch, getState) => {
  const {
    root: { memoDashLib }
  } = getState()
  if (!memoDashLib) {
    dispatch(logoutError('MemoDashLib isnt initialized yet'))
    return
  }

  try {
    await memoDashLib.logout()
    dispatch(logoutSuccessfull())
    dispatch(push('/'))
  } catch (error) {
    dispatch(logoutError(error.message))
  }
}

const logoutError = message => ({ type: AuthActionTypes.LOGOUT_ERROR, payload: message })
const logoutSuccessfull = () => ({ type: AuthActionTypes.LOGOUT_SUCCESSFULL })

export { AuthActionTypes, login, loginError, loginSuccessfull, logout, logoutError, logoutSuccessfull }
