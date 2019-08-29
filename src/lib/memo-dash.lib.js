import DAPIClient from "@dashevo/dapi-client"
import DashPlatformProtocol from "@dashevo/dpp"
import {
  Transaction,
  PrivateKey,
  PublicKey,
  Address
} from "@dashevo/dashcore-lib"

import memoDashContract from "./memo-dash.contract"

import DPALib from "@dashevo/dpa-lib"
import { getMemosForSearch } from "../store/selectors/search.selector"

export default class MemoDashLib {
  constructor(networkType, seeds, contractName, contract, faucetPrivateKey) {
    this.faucetPrivateKey = new PrivateKey(faucetPrivateKey)
    const faucetPublicKey = PublicKey.fromPrivateKey(this.faucetPrivateKey)
    this.faucetAddress = Address.fromPublicKey(
      faucetPublicKey,
      networkType === "devnet" ? "testnet" : networkType
    ).toString()

    this.dpaLib = new DPALib(this.faucetPrivateKey, {
      seeds,
      contractName,
      contract
    })
  }

  /**
   * Search for blockchain users who match a given search pattern
   * @param {string} username - Username
   * @returns {array} Array of matching blockchain user accounts
   */
  async getUserByName(username) {
    return await this.dpaLib.getUserByName(username)
  }

  /**
   Authenticate to the MemoDash DAP
   * @param {object} config - Configuration object { blockchainUsername: "usernameGoesHere" }
   */
  async login(user) {
    this.currentUser = user
    this.dpaLib.dpp.setUserId(this.currentUser.userId)
    this.isAuthed = true
  }

  async logout() {
    this.currentUser = undefined
    // this.dpp.setUserId(undefined)
    this.dpaLib.dpp.setUserId(undefined)
    this.isAuthed = false
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
    const result = await this.dpaLib.searchUsers()
    return result.users
  }

  // async getUserProfile(username) {
  // const profile = await this.dpaLib.getDocum
  // const [profile, userId, followers, following, likes] = await Promise.all([
  //   this.memoDashClient.getUserProfile(username),
  //   this.memoDashClient.getUserId(username),
  //   this.memoDashClient.getUserFollowers(username),
  //   this.memoDashClient.getUserFollowing(username),
  //   this.getUserLikes(username)
  // ])
  //
  // return {
  //   username,
  //   profile,
  //   userId,
  //   followers: followers ? followers.map(user => user.username) : undefined,
  //   following: following ? following.map(user => user.username) : undefined,
  //   likes
  // }
  // }

  /**
   * Get a single user
   *
   * @param username
   * @returns
   * {
   *   username,
   *   { username, bio, avatarUrl, followers, following, likes },
   *   userId
   * }
   */
  async getUser(username) {
    const user = await this.dpaLib.getUserByName(username)

    if (!user) {
      throw new Error("User not found")
    }

    // const [profile] = await Promise.all([this.getUserProfile(user.regtxid)])

    return user
    // return {
    //   username,
    //   profile,
    //   userId: user.regtxid
    //   followers: followers ? followers.map(user => user.username) : undefined,
    //   following: following ? following.map(user => user.username) : undefined,
    //   likes
    // }

    // const [profile, userId, followers, following, likes] = await Promise.all([
    //   this.memoDashClient.getUserProfile(username),
    //   this.memoDashClient.getUserId(username),
    //   this.memoDashClient.getUserFollowers(username),
    //   this.memoDashClient.getUserFollowing(username),
    //   this.getUserLikes(username)
    // ])
    // return {
    //   username,
    //   profile,
    //   userId,
    //   followers: followers ? followers.map(user => user.username) : undefined,
    //   following: following ? following.map(user => user.username) : undefined,
    //   likes
    // }
  }

  async getUserProfile(userId) {
    const [profile] = await this.dpaLib.getDocuments("userProfile", userId)
    console.log(`Got profile for user ${userId}`, profile)
    return profile
  }

  async getUserFollowers(userId) {}

  async updateProfile(bio) {
    // await this.memoDashClient.updateProfile({ text: bio })
  }

  /**
   * Returns memos for a user
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
  async getMemosForUser(userId, limit) {
    const memos = await this.dpaLib.getDocuments("memo", userId, limit)
    console.log(`getMemosForUser for ${userId} limited by ${limit}`, memos)
    return memos
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
    // return await this.memoDashClient.getMemo(username, memoId)
  }

  /**
   * Returns memos
   *
   * @param {Array<{username, idx}>} memoIds
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
  async getMemos(memoIds) {
    // if (memoIds) {
    //   return await Promise.all(memoIds.map(memoId => this.getMemo(memoId.username, memoId.idx)))
    // }
    // return await this.memoDashClient.getMemos()
  }

  /**
   * Like a memo
   *
   * @param {string} username - username of user who posted the memo
   * @param {string} memoId - memo id
   * @memberof MemoDashLib
   */
  async likeMemo(username, memoId) {
    // await this.memoDashClient.likeMemo(username, memoId)
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
    // const answer = await this.memoDashClient.replyToMemo(username, memoId, message)
    // return answer
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
    // return await this.memoDashClient.getMemoReplies(username, memoId)
  }

  /**
   * Post memo to your profile.
   * @param {string} message
   * @return {Promise<boolean>}
   * @memberof MemoDashLib
   */
  async postMemo(message) {
    const memo = {
      message,
      createdAt: new Date().toJSON()
    }
    this.dpaLib.publishDocument(memo, this.dpp.getContract(), this.currentUser)
    // await this.memoDashClient.postMemo(message)
  }

  /**
   * Removes memo context
   * @param {string} memoId
   * @return {Promise<boolean>}
   * @memberof MemoDashLib
   */
  async deleteMemo(memoId) {
    // await this.memoDashClient.deleteMemo(memoId)
  }

  /**
   * Edit own memo at the given infex
   * @param {string} idx
   * @param {string} newMessage
   * @return {Promise<boolean>}
   * @memberof MemoDashLib
   */
  async editMemo(memoId, message) {
    // await this.memoDashClient.editMemo(memoId, message)
  }

  /**
   * Remove like from memo
   *
   * @param {string} likeId
   * @memberof MemoDashLib
   */
  async removeLike(likeId) {
    // await this.memoDashClient.removeLike(likeId)
  }

  /**
   * Get all likes of a user
   * @returns {Promise<Array<{
   *  idx,
   *  relation
   * }>>}
   * @memberof MemoDashLib
   */
  async getUserLikes(username) {
    // const likes = await this.memoDashClient.getUserLikes(username)
    // return await Promise.all(
    //   likes.map(async like => {
    //     like.relation.username = await this.memoDashClient.getUsername(like.relation.userId)
    //     return like
    //   })
    // )
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
    // return await this.memoDashClient.getUserFollowers(username)
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
    // return await this.memoDashClient.getUserFollowing(username)
  }

  /**
   * Follow a user
   * @param {string} username
   * @return {Promise<boolean>}
   */
  async followUser(username) {
    // return await this.memoDashClient.followUser(username)
  }

  /**
   * Unfollow user
   * @param {string} username
   * @return {Promise<boolean>}
   */
  async unFollowUser(username) {
    // return await this.memoDashClient.unFollowUser(username)
  }
}
