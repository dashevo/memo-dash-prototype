import MemoDashLib from './memo-dash.lib'
import testUsers from '../test-utils/test-users'

jest.mock('@dashevo/dash-schema/dash-schema-lib')

describe('MemoDashLib', () => {
  let memoDashLib
  let alice = testUsers['alice']
  beforeEach(() => {
    memoDashLib = new MemoDashLib()
    memoDashLib.memoDashClient = {
      getUserProfile: jest.fn().mockReturnValue(alice.profile),
      getUserId: jest.fn().mockReturnValue(alice.userId),
      getMemosByUsername: jest.fn().mockReturnValue(alice.memos),
      getMemo: jest.fn().mockReturnValue(alice.memos[0]),
      getAllOwnLikes: jest.fn(),
      postMemo: jest.fn()
    }
  })

  describe('Users', () => {
    describe('getUser(username)', () => {
      it('should get user profile from client', () => {
        memoDashLib.getUser(alice.username)
        expect(memoDashLib.memoDashClient.getUserProfile).toHaveBeenCalledWith(alice.username)
      })

      it('should get user profile from client', () => {
        memoDashLib.getUser(alice.username)
        expect(memoDashLib.memoDashClient.getUserId).toHaveBeenCalledWith(alice.username)
      })

      it('should return user with username, profile and userId', async () => {
        const user = await memoDashLib.getUser(alice.username)
        expect(user).toEqual({ username: alice.username, profile: alice.profile, userId: alice.userId })
      })
    })
  })

  describe('Memos', () => {
    const memos = alice.memos

    describe('getMemosForUser(username)', () => {
      it('should get memos from client', () => {
        memoDashLib.getMemosForUser(alice.username)
        expect(memoDashLib.memoDashClient.getMemosByUsername).toHaveBeenCalledWith(alice.username)
      })
    })

    describe('getMemo(username, memoId)', () => {
      it('should get memo from client', () => {
        const memoId = 1
        memoDashLib.getMemo(alice.username, memoId)
        expect(memoDashLib.memoDashClient.getMemo).toHaveBeenCalledWith(alice.username, memoId)
      })
    })

    describe('postMemo(message)', () => {
      it('should post memo', () => {
        const message = 'message'
        memoDashLib.postMemo(message)
        expect(memoDashLib.memoDashClient.postMemo).toHaveBeenCalledWith(message)
      })
    })
  })

  describe('Likes', () => {
    describe('getAllOwnLikes()', () => {
      it('should get like for current user from client', () => {
        memoDashLib.getAllOwnLikes()
        expect(memoDashLib.memoDashClient.getAllOwnLikes).toHaveBeenCalled()
      })
    })
  })
})
