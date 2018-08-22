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

  /**
   * Get an array with users
   *
   * @param usernames
   * @return {Promise<Array<{
   * {
   *   username,
   *   { username, bio, avatarUrl, followersCount, followingCount, likesCount },
   *   userId
   * }
   * }>>}
   * @memberof MemoDashLib
   */
  async getUsers(usernames) {
    const getUserPromises = []
    for (const username of usernames) {
      getUserPromises.push(this.getUser(username))
    }

    return await Promise.all(getUserPromises)
  }

  /**
   * Get an array with all available users
   *
   * @return {Promise<Array<{
   * {
   *   username,
   *   { username, bio, avatarUrl, followersCount, followingCount, likesCount },
   *   userId
   * }
   * }>>}
   * @memberof MemoDashLib
   */
  async getAllUsers() {
    const userProfiles = await this.memoDashClient.getAllProfiles()

    const userIds = await Promise.all(
      userProfiles.map(userProfile => this.memoDashClient.getUserId(userProfile.username))
    )

    return userProfiles.map((userProfile, index) => ({
      username: userProfile.username,
      profile: userProfile,
      userId: userIds[index]
    }))
  }

  /**
   * Get a single user
   *
   * @param username
   * @returns
   * {
   *   username,
   *   { username, bio, avatarUrl, followersCount, followingCount, likesCount },
   *   userId
   * }
   */
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
   * Returns all memos for a user
   *
   * @param {string} username
   * @return {Promise<Array<{
   *   username,
   *   memoDatetime,
   *   memoText,
   *   memoLikesCount,
   *   memoTipTotal,
   *   memoRepliesCount
   * }>>}
   * @memberof MemoDashLib
   */
  async getMemosForUser(username) {
    return await this.memoDashClient.getMemosByUsername(username)
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
    return await this.memoDashClient.getMemo(username, memoId)
  }

  async getMemos() {
    return await this.memoDashClient.getMemos()
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
   * Reply to a given memo
   *
   * @param {*} username - username of user who posted the memo
   * @param {*} memoId - memo id
   * @param {*} message - reply message
   * @memberof MemoDashLib
   */
  async replyToMemo(username, memoId, message) {
    const answer = await this.memoDashClient.replyToMemo(username, memoId, message)
    console.log(answer)
    return answer
  }

  /**
   *
   *
   * @param {*} username
   * @param {*} memoId
   * @returns
   * [{
   *   username,
   *   memoDatetime,
   *   memoText,
   *   memoLikesCount,
   *   memoTipTotal,
   *   memoRepliesCount
   * }]
   * @memberof MemoDashLib
   */
  async getMemoReplies(username, memoId) {
    return await this.memoDashClient.getMemoReplies(username, memoId)
  }

  async postMemo(message) {
    await this.memoDashClient.postMemo(message)
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
    const likes = await this.memoDashClient.getAllOwnLikes()

    for (const like of likes) {
      like.relation.username = await this.memoDashClient.getUsername(like.relation.userId)
    }
    return likes
  }

  /**
   * Get followers of a user
   * @returns
   * [{
   *   username
   * }]
   * @memberof MemoDashLib
   */
  async getUserFollowers(username) {
    return await this.memoDashClient.getUserFollowers(username)
  }

  /**
   * Get users followed by a user
   * @returns
   * [{
   *   username
   * }]
   * @memberof MemoDashLib
   */
  async getUserFollowing(username) {
    return await this.memoDashClient.getUserFollowing(username)
  }

  _isIterable = object => object && Symbol.iterator in Object(object)
}
