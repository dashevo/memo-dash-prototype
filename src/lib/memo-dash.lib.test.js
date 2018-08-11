import MemoDashLib from './memo-dash.lib'

jest.mock('@dashevo/dash-schema/dash-schema-lib')

describe('MemoDashLib', () => {
  let memoDashLib
  let memos = [{ message: 'Hello', createdAt: '', username: 'Alice' }]
  beforeEach(() => {
    memoDashLib = new MemoDashLib()
    memoDashLib.memoDashClient = {
      getUserProfile: jest.fn().mockReturnValue({ avatarUrl: 'avatarUrl' }),
      getMemosByUsername: jest.fn().mockReturnValue(memos),
      getMemo: jest.fn().mockReturnValue(memos[0]),
      getAllOwnLikes: jest.fn()
    }
  })

  describe('Memos', () => {
    describe('getMemosForUser(username)', () => {
      it('should get memos from client', () => {
        const username = 'username'
        memoDashLib.getMemosForUser(username)
        expect(memoDashLib.memoDashClient.getMemosByUsername).toHaveBeenCalledWith(username)
      })
      })

    describe('getMemo(username, memoId)', () => {
      it('should get memo from client', () => {
        const username = 'username'
        const memoId = 1
        expect(memoDashLib.memoDashClient.getMemo).toHaveBeenCalledWith(alice.username, memoId)
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
