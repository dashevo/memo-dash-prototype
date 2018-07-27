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

      it('should enrich memos with avatarUrl', async () => {
        memoDashLib._enrichMemosWithAvatarUrl = jest.fn()
        await memoDashLib.getMemosForUser('username')
        expect(memoDashLib._enrichMemosWithAvatarUrl).toHaveBeenCalledWith(memos)
      })
    })

    describe('getMemo(username, memoId)', () => {
      it('should get memo from client', () => {
        const username = 'username'
        const memoId = 1
        memoDashLib.getMemo(username, memoId)
        expect(memoDashLib.memoDashClient.getMemo).toHaveBeenCalledWith(username, memoId)
      })

      it('should enrich memo with avatarUrl', async () => {
        memoDashLib._enrichMemosWithAvatarUrl = jest.fn().mockReturnValue(memos)
        const memo = await memoDashLib.getMemo('username', 1)
        expect(memoDashLib._enrichMemosWithAvatarUrl).toHaveBeenCalledWith([memo])
      })
    })

    describe('enrich with avatarUrl', () => {
      const memos = [
        { name: 'should return undefined if memos is undefined', given: undefined, expected: undefined },
        { name: 'should return null if memos is null', given: null, expected: null },
        { name: 'should handle correct if memos is not iterable', given: {}, expected: {} },
        {
          name: 'should add avatarUrl if memos are present',
          given: [{}, {}],
          expected: [{ avatarUrl: 'avatarUrl' }, { avatarUrl: 'avatarUrl' }]
        }
      ]

      for (const memo of memos) {
        it(memo.name, async () => {
          expect(await memoDashLib._enrichMemosWithAvatarUrl(memo.given)).toEqual(memo.expected)
        })
      }
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
