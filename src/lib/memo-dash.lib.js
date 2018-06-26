import Schema from '@dashevo/dash-schema'
import data from '@dashevo/dash-schema/daps/memodash/memodash-client-fixtures'
import dashMemoSchema from '@dashevo/dash-schema/daps/memodash/memodash-schema'

const debug = require('debug')('memo-dash:MemoDashClient')

export default class MemoDashLib {
  constructor() {
    Schema.VMN.Util.reset()

    this.MemoDashClient = new Schema.VMN.MemoDashClient()
    debug('MemoDashClient')
  }

  async init() {
    await this._createUser(data.alice_subtx_1)
    await this._createUser(data.bob_subtx_1)
    await this._createUser(data.charlie_subtx_1)

    await this.MemoDashClient.createDap(dashMemoSchema);
    this.MemoDashClient.logout()
  }

  async _createUser(user) {
    this.MemoDashClient.DAPI.CreateUser(user);
    this.MemoDashClient.DAPI.DashCore.mineBlock();
    await this.MemoDashClient.login(user.subtx.uname);
  }

  /**
   * Search for blockchain users who match a given search pattern
   * Excludes contacts and yourself
   * @param {string} pattern - search string
   * @returns {array} Array of matching blockchain user accounts
   */
  async searchBlockchainUsers(pattern) {
    let users = await this.MemoDashClient.searchUsers(pattern);
    return users;
  }

  /**
   Authenticate to the MemoDash DAP
   * @param {object} config - Configuration object { blockchainUsername: "usernameGoesHere" }
   */
  async login(config) {
    await this.MemoDashClient.login(config.blockchainUsername);
  }
}
