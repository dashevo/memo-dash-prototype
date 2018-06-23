const LoginActionTypes = {
  LOGIN_ERROR: 'LOGIN_ERROR',
  LOGIN_SUCCESSFULL: 'LOGIN_SUCCESSFULL'
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
  } catch (error) {
    dispatch(loginError(error.message))
  }
}

const loginError = message => ({ type: LoginActionTypes.LOGIN_ERROR, payload: message })
const loginSuccessfull = userName => ({ type: LoginActionTypes.LOGIN_SUCCESSFULL, payload: userName })

export { LoginActionTypes, login, loginError, loginSuccessfull }
