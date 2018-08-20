import { testUsers, testMemos } from '../../test-utils/test-data'
import * as selector from './memo.selector'

import { combineMemoId } from '../../store/reducers/memo.reducer'

describe('router selector', () => {
  const alice = testUsers['alice']
  const bob = testUsers['bob']

  const state = {
    user: {
      currentUser: alice.username,
      users: { [alice.username]: alice, [bob.username]: bob }
    },
    memo: {
      memos: testMemos
    }
  }

  it('should return memos', () => {
    expect(selector.getMemos(state)).toEqual(state.memo.memos)
  })

  it('should return memo by combinedId', () => {
    const memo = testMemos[alice.memoIds[0]]
    const combinedMemoId = combineMemoId(memo.username, memo.idx)
    expect(selector.getMemoByCombinedId(combinedMemoId)(state)).toEqual(memo)
  })

  it('should return memos by combinedIds', () => {
    const memo = testMemos[alice.memoIds[0]]
    const combinedMemoId = combineMemoId(memo.username, memo.idx)
    expect(selector.getMemosByCombinedIds([combinedMemoId])(state)).toEqual([memo])
  })

  it('should return true if memo belongs to current user', () => {
    const memo = testMemos[alice.memoIds[0]]
    expect(selector.isMemoOfCurrentUser(memo)(state)).toEqual(true)
  })

  it('should return false if memo does not belong to current user', () => {
    const memo = testMemos[bob.memoIds[0]]
    expect(selector.isMemoOfCurrentUser(memo)(state)).toEqual(false)
  })

  it('should return true if memo is likes by current user', () => {
    const memo = testMemos[bob.memoIds[0]]
    expect(selector.isMemoLikedByCurrentUser(memo)(state)).toEqual(true)
  })

  it('should return true if memo is likes by current user', () => {
    const memo = { ...testMemos[bob.memoIds[0]], idx: 3 }
    expect(selector.isMemoLikedByCurrentUser(memo)(state)).toEqual(false)
  })
})
