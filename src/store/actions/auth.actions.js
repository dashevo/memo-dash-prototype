import { push } from "connected-react-router"
import { getUser, userReceived } from "./user.actions"
import { getMemosForUser } from "./memo.actions"

const AuthActionTypes = {
  LOGIN_ERROR: "LOGIN_ERROR",
  LOGIN_SUCCESSFULL: "LOGIN_SUCCESSFULL",
  LOGOUT_ERROR: "LOGOUT_ERROR",
  LOGOUT_SUCCESSFULL: "LOGOUT_SUCCESSFULL"
}

const login = blockchainUsername => async (dispatch, getState) => {
  const {
    root: { memoDashLib }
  } = getState()
  if (!memoDashLib) {
    dispatch(loginError("MemoDashLib isnt initialized yet"))
    return
  }

  let blockchainUser = await memoDashLib.getUserByName(blockchainUsername)
  if (!blockchainUser) {
    dispatch(loginError(`User ${blockchainUsername} not found on blockchain`))
    return
  }

  // blockchainUser = blockchainUser[0]

  try {
    await memoDashLib.login(blockchainUser)
    await dispatch(loginSuccessfull(blockchainUser.uname))
    // await dispatch(userReceived(blockchainUser))
    await dispatch(getUser(blockchainUser.uname))
    // await dispatch(getMemosForUser(blockchainUser.name))
    dispatch(push("/home"))
  } catch (error) {
    dispatch(loginError(error.message))
  }
}

const loginError = message => ({
  type: AuthActionTypes.LOGIN_ERROR,
  payload: message
})
const loginSuccessfull = username => ({
  type: AuthActionTypes.LOGIN_SUCCESSFULL,
  payload: username
})

const logout = () => async (dispatch, getState) => {
  const {
    root: { memoDashLib }
  } = getState()
  if (!memoDashLib) {
    dispatch(logoutError("MemoDashLib isnt initialized yet"))
    return
  }

  try {
    await memoDashLib.logout()
    dispatch(logoutSuccessfull())
    dispatch(push("/"))
  } catch (error) {
    dispatch(logoutError(error.message))
  }
}

const logoutError = message => ({
  type: AuthActionTypes.LOGOUT_ERROR,
  payload: message
})
const logoutSuccessfull = () => ({ type: AuthActionTypes.LOGOUT_SUCCESSFULL })

export {
  AuthActionTypes,
  login,
  loginError,
  loginSuccessfull,
  logout,
  logoutError,
  logoutSuccessfull
}
