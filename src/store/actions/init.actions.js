import MemoDashLib from '../../lib/memo-dash.lib'

const InitActionTypes = {
  INIT_FINISHED: 'INIT_FINISHED'
}

const initMemoDashClient = () => async dispatch => {
  const memoDashLib = new MemoDashLib()
  await memoDashLib.init()

  dispatch(initFinished(memoDashLib))
}

const initFinished = memoDashLib => ({ type: InitActionTypes.INIT_FINISHED, payload: memoDashLib })

export { InitActionTypes, initMemoDashClient, initFinished }
