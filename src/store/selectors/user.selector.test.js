import { testUsers, testMemos } from '../../test-utils/test-data'
import * as selector from './user.selector'

describe('user selector', () => {
  const alice = testUsers['alice']
  const aliceMemos = alice.memoIds.map(memoId => testMemos[memoId])
  const bob = testUsers['bob']

  const state = {
    user: {
      currentUser: alice.username,
      memos: alice.memos,
      authError: undefined,
      users: { [alice.username]: alice, [bob.username]: bob }
    },
    memo: {
      memos: testMemos
    }
  }

  it('should return current user name', () => {
    expect(selector.getCurrentUsername(state)).toEqual(alice.username)
  })

  it('should return current user', () => {
    expect(selector.getCurrentUser(state)).toEqual(alice)
  })

  it('should return user by username', () => {
    expect(selector.getUserByUsername(bob.username)(state)).toEqual(bob)
  })

  it('should return avatar url', () => {
    expect(selector.getAvatarUrl(alice.username)(state)).toEqual(alice.profile.avatarUrl)
  })

  it('should return user profile', () => {
    expect(selector.getUserProfile(alice.username)(state)).toEqual(alice.profile)
  })

  it('should return user memos', () => {
    expect(selector.getUserMemos(alice.username)(state)).toEqual(aliceMemos)
  })

  it('should return user followers', () => {
    expect(selector.getUserFollowers(alice.username)(state)).toEqual([bob])
  })

  it('should return user following', () => {
    expect(selector.getUserFollowing(alice.username)(state)).toEqual([bob])
  })

  describe('missing users', () => {
    it('should return an empty array if all users are available', () => {
      expect(selector.getMissingUsers([alice.username, bob.username])(state)).toEqual([])
    })

    it('should return an array with the missing user', () => {
      const missingUser = { username: 'charlie' }
      expect(selector.getMissingUsers([alice.username, missingUser.username])(state)).toEqual([
        missingUser.username
      ])
    })
  })
})
