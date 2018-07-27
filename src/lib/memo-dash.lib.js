import MemoDashClient from '@dashevo/dash-schema/dash-core-daps/memodash/memodash-client'

import generateTestData from './test-data-generator'

export default class MemoDashLib {
  async init() {
    this.memoDashClient = new MemoDashClient()

    await generateTestData(this.memoDashClient)
  }

  /**
   * Search for blockchain users who match a given search pattern
   * Excludes contacts and yourself
   * @param {string} pattern - search string
   * @returns {array} Array of matching blockchain user accounts
   */
  async searchBlockchainUsers(pattern) {
    let users = await this.memoDashClient.searchUsers(pattern)
    return users
  }

  /**
   Authenticate to the MemoDash DAP
   * @param {object} config - Configuration object { blockchainUsername: "usernameGoesHere" }
   */
  async login(config) {
    await this.memoDashClient.login(config.blockchainUsername)
  }

  async logout() {
    await this.memoDashClient.logout()
  }

  async getUser(username) {
    const [profile, userId] = await Promise.all([
      this.memoDashClient.getUserProfile(username),
      this.memoDashClient.getUserId(username)
    ])

    return {
      username,
      profile,
      userId
    }
  }

  /**
   * Returns all memos for a user enriched with user's avatar URL
   *
   * @param {string} username
   * @return {Promise<Array<{
   *   username,
   *   memoDatetime,
   *   memoText,
   *   memoLikesCount,
   *   memoTipTotal,
   *   memoRepliesCount,
   *   avatarUrl
   * }>>}
   * @memberof MemoDashLib
   */
  async getMemosForUser(username) {
    const memos = await this.memoDashClient.getMemosByUsername(username)
    return await this._enrichMemosWithAvatarUrl(memos)
  }

  /**
   * Get a specific Memo
   * @param {string} username
   * @param {number} memoId
   * @returns
   * Promise<{
   *   username,
   *   idx,
   *   memoDatetime,
   *   memoText,
   *   memoLikesCount,
   *   memoTipTotal,
   *   memoRepliesCount,
   *   avatarUrl
   * }>
   */
  async getMemo(username, memoId) {
    const memo = await this.memoDashClient.getMemo(username, memoId)
    const memosWithAvatarUrl = await this._enrichMemosWithAvatarUrl([memo])
    return memosWithAvatarUrl[0]
  }

  async getAllMemos() {
    const memos = await this.memoDashClient.getMemos()
    return await this._enrichMemosWithAvatarUrl(memos)
  }

  /**
   * Like a memo
   *
   * @param {string} username - username of user who posted the memo
   * @param {string} memoId - memo id
   * @memberof MemoDashLib
   */
  async likeMemo(username, memoId) {
    await this.memoDashClient.likeMemo(username, memoId)
  }

  /**
   * Remove like from memo
   *
   * @param {string} likeId
   * @memberof MemoDashLib
   */
  async removeLike(likeId) {
    await this.memoDashClient.removeLike(likeId)
  }

  /**
   * Get all likes for the current user
   *
   * @returns {Promise<Array<{
   *  idx,
   *  relation
   * }>>}
   * @memberof MemoDashLib
   */
  async getAllOwnLikes() {
    return await this.memoDashClient.getAllOwnLikes()
  }

  _isIterable = object => object && Symbol.iterator in Object(object)

  _enrichMemosWithAvatarUrl = async memos => {
    const userAvatars = new Map()
    if (this._isIterable(memos)) {
      const enrichedMemos = []

      for (const memo of memos) {
        if (!userAvatars.has(memo.username)) {
          const userProfile = await this.memoDashClient.getUserProfile(memo.username)
          if (userProfile) userAvatars.set(memo.username, userProfile.avatarUrl)
        }

        enrichedMemos.push({
          ...memo,
          avatarUrl: userAvatars.get(memo.username)
        })
      }
      return enrichedMemos
    }

    return memos
  }
}
