const createDebug = require('debug')
export default namespace => createDebug(`memo-dash:${namespace}`)
