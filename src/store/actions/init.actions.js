// import MemoDashLib from '../../lib/memo-dash.lib.vmn.js_'

import MemoDashLib from "../../lib/memo-dash.lib"
import memoDashContract from "../../lib/memo-dash.contract"

const InitActionTypes = {
  INIT_FINISHED: "INIT_FINISHED"
}

const initMemoDashClient = () => async dispatch => {
  const seeds = process.env.REACT_APP_DAPI_CLIENT_SEEDS.split(",").map(ip => ({
    service: `${ip}:${process.env.REACT_APP_DAPI_CLIENT_PORT}`
  }))

  const memoDashLib = new MemoDashLib(
    process.env.REACT_APP_NETWORK_TYPE,
    seeds,
    "memo-dash",
    memoDashContract,
    process.env.REACT_APP_FAUCET_PRIVATE_KEY
  )

  // await memoDashLib.init()

  dispatch(initFinished(memoDashLib))
}

const initFinished = memoDashLib => ({
  type: InitActionTypes.INIT_FINISHED,
  payload: memoDashLib
})

export { InitActionTypes, initMemoDashClient, initFinished }
