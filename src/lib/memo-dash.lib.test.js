import MemoDashLib from './memo-dash.lib'

jest.mock('@dashevo/dash-schema/lib')

describe('MemoDashLib', () => {
  let memoDashLib
  beforeEach(() => {
    memoDashLib = new MemoDashLib()
    memoDashLib.memoDashClient = { getUserProfile: jest.fn().mockReturnValue({ avatarUrl: 'avatarUrl' }) }
  })

  describe('Memos', () => {
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
})
