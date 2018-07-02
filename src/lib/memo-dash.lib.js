import Schema from '@dashevo/dash-schema/lib'
import MemoDashClient from '@dashevo/dash-schema/dash-core-daps/memodash/memodash-client'

import generateTestData from './test-data-generator'

const debug = require('debug')('memo-dash:MemoDashClient')

export default class MemoDashLib {
  constructor() {
    Schema.VMN.Util.reset()

    debug('MemoDashClient')
  }

  async init() {
    this.MemoDashClient = new MemoDashClient()

    await generateTestData(this.MemoDashClient)
  }

  /**
   * Search for blockchain users who match a given search pattern
   * Excludes contacts and yourself
   * @param {string} pattern - search string
   * @returns {array} Array of matching blockchain user accounts
   */
  async searchBlockchainUsers(pattern) {
    let users = await this.MemoDashClient.searchUsers(pattern)
    return users
  }

  /**
   Authenticate to the MemoDash DAP
   * @param {object} config - Configuration object { blockchainUsername: "usernameGoesHere" }
   */
  async login(config) {
    await this.MemoDashClient.login(config.blockchainUsername)
  }

  async logout() {
    await this.MemoDashClient.logout()
  }

  async getUserProfile() {
    return await this.MemoDashClient.getOwnProfile()
  }

  async getOwnMemos() {
    return await this.MemoDashClient.getAllOwnMemos()
  }

  async getAllMemos() {
    return await this.MemoDashClient.getMemos()
  }
}
