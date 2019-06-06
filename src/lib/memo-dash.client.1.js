import DAPIClient from "@dashevo/dapi-client";
import DashPlatformProtocol from "@dashevo/dpp";
import { PrivateKey, PublicKey, Address } from "@dashevo/dashcore-lib";

import memoDashContract from "./memo-dash.contract";

export class MemoDashClient {
  constructor(networkType, seeds, privateKey) {
    this.dpp = new DashPlatformProtocol();
    this.dapiClient = new DAPIClient({
      seeds,
      timeout: 30000
    });

    faucetPrivateKey = new PrivateKey(privateKey);
    const faucetPublicKey = PublicKey.fromPrivateKey(faucetPrivateKey);
    faucetAddress = Address.fromPublicKey(
      faucetPublicKey,
      networkType === "devnet" ? "testnet" : networkType
    ).toString();

    const contract = dpp.contract.create("memo-dash", memoDashContract);

    const result = dpp.contract.validate(contract);
    console.log(`MemoDash contract is valid: ${result.isValid()}`);
    dpp.setContract(contract);
  }

  /**
   * Returns user id for the given username.
   * @param {string} username
   * @return {Promise<string>}
   */
  async getUserId(username) {
    const user = await this.dapiClient.getUserByName(username);
    return user ? user.uname : undefined;
  }

  /**
   * Return username by id
   * @param {string} userId
   * @return {Promise<string>}
   */
  async getUsername(userId) {
    const user = await this.dapiClient.getUserById(userId);
    return user ? user.uname : undefined;
  }

  /**
   * Get all Memos
   * @returns
   * [{
   *   username,
   *   memoDatetime,
   *   memoText,
   *   memoLikesCount,
   *   memoTipTotal,
   *   memoRepliesCount
   * }]
   */
  async getMemos() {}

  /**
   * @return {Promise<[]>}
   */
  async getAllProfiles() {}

  /**
   *  ------------------------
   *  Queries
   *  ------------------------
   */

  /**
   * Get a user's profile info
   *
   * returns info for profile page on a MemoDash user
   * e.g. https://memo.cash/profile/19RyV6XQEww5td2LPWDpK8o5V8at7Vpwgv
   * @param username
   * @returns
   * {
   *   username,
   *   bio,
   *   avatarUrl,
   *   followersCount,
   *   followingCount,
   *   likesCount
   * }
   */
  async getUserProfile(username) {}

  async getOwnProfile() {}

  /**
   * Get a specific Memo
   * @param {string} username
   * @param {number} idx
   * @returns
   * Promise<{
   *   username,
   *   memoDatetime,
   *   memoText,
   *   memoLikesCount,
   *   memoTipTotal,
   *   memoRepliesCount
   * }>
   */
  async getMemo(username, idx) {}

  /**
   * @param {string} username
   * @return {Promise<Array<{
   *   username,
   *   memoDatetime,
   *   memoText,
   *   memoLikesCount,
   *   memoTipTotal,
   *   memoRepliesCount
   * }>>}
   */
  async getMemosByUsername(username) {}

  /**
   * Returns all own memos
   * @return {Promise<Array<{username, memoDatetime, memoText, memoLikesCount, memoTipTotal, memoRepliesCount}>>}
   */
  async getAllOwnMemos() {}

  /**
   * Edit own memo at the given infex
   * @param {string} idx
   * @param {string} newMessage
   * @return {Promise<boolean>}
   */
  async editMemo(idx, newMessage) {}

  /**
   * Removes memo context
   * @param {string} idx
   * @return {Promise<boolean>}
   */
  async deleteMemo(idx) {}

  /**
   * Get Memos that reply to a given Memo
   * @returns
   * [{
   *   username,
   *   memoDatetime,
   *   memoText,
   *   memoLikesCount,
   *   memoTipTotal,
   *   memoRepliesCount
   * }]
   */
  async getMemoReplies(username, idx) {}

  /**
   *  ------------------------
   *  Actions
   *  ------------------------
   */

  /**
   * Create memo dash profile
   * @param profileData
   * @param {string} profileData.text
   * @param {string} profileData.avatarUrl
   * @param {string} profileData.address
   * @param {string} profileData.name
   * @return {Promise<*>}
   */
  async signup(profileData) {}

  /**
   * Update memo dash profile
   * @param newProfileData
   * @param {string} [newProfileData.text]
   * @param {string} [newProfileData.avatarUrl]
   * @param {string} [newProfileData.address]
   * @param {string} [newProfileData.name]
   * @return {Promise<boolean>}
   */
  async updateProfile(newProfileData) {}

  /**
   * Post memo to your profile.
   * @param {string} message
   * @return {Promise<boolean>}
   */
  async postMemo(message) {}

  /**
   * Follow a user
   * @param {string} username
   * @return {Promise<boolean>}
   */
  async followUser(username) {}

  /**
   * Get followers of a user
   * @returns
   * [{
   *   username
   * }]
   */
  async getUserFollowers(username) {
    const { related } = await this.getDapContext(username);
    if (related) {
      return this.filterObjectsByType(related, "follow").map(follower => ({
        username: follower.meta.uname
      }));
    }
    return [];
  }

  /**
   * Get users followed by a user
   * @returns
   * [{
   *   username
   * }]
   */
  async getUserFollowing(username) {}

  /**
   * Unfollow user
   * @param {string} username
   * @return {Promise<boolean>}
   */
  async unFollowUser(username) {}

  async replyToMemo(username, idx, message) {}

  /**
   * Like memo
   * @param {string} username - username of user who posted the memo
   * @param {string} idx - memo id
   * @return {Promise<*>}
   */
  async likeMemo(username, idx) {}

  async getAllOwnLikes() {}

  /**
   * Remove like from memo
   * @param {string} idx - like id
   * @return {Promise<void>}
   */
  async removeLike(idx) {}

  async tipMemo(username, idx, amount) {}

  /**
   *  ------------------------
   *  Not required (from memo.cash)
   *  ------------------------
   *
   *  Set image base URL
   *  Attach picture
   *  Set profile picture
   *  Repost memo
   *  Post topic message
   *
   */
}
