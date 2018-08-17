import testUsers from '../../test-utils/test-users'
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
      memos: {
        [combineMemoId(alice.memos[0].username, alice.memos[0].idx)]: alice.memos[0],
        [combineMemoId(alice.memos[1].username, alice.memos[1].idx)]: alice.memos[1],
        [combineMemoId(bob.memos[0].username, bob.memos[0].idx)]: bob.memos[1]
      }
    }
  }

  it('should return memos', () => {
    expect(selector.getMemos(state)).toEqual(state.memo.memos)
  })

  it('should return memo by combinedId', () => {
    const memo = alice.memos[0]
    const combinedMemoId = combineMemoId(memo.username, memo.idx)
    expect(selector.getMemoByCombinedId(combinedMemoId)(state)).toEqual(alice.memos[0])
  })

  it('should return memos by combinedIds', () => {
    const memo = alice.memos[0]
    const combinedMemoId = combineMemoId(memo.username, memo.idx)
    expect(selector.getMemosByCombinedIds([combinedMemoId])(state)).toEqual([alice.memos[0]])
  })

  it('should return true if memo belongs to current user', () => {
    const memo = alice.memos[0]
    expect(selector.isMemoOfCurrentUser(memo)(state)).toEqual(true)
  })

  it('should return false if memo does not belong to current user', () => {
    const memo = bob.memos[0]
    expect(selector.isMemoOfCurrentUser(memo)(state)).toEqual(false)
  })

  it('should return true if memo is likes by current user', () => {
    const memo = bob.memos[0]
    expect(selector.isMemoLikedByCurrentUser(memo)(state)).toEqual(true)
  })

  it('should return true if memo is likes by current user', () => {
    const memo = { ...bob.memos[0], idx: 3 }
    expect(selector.isMemoLikedByCurrentUser(memo)(state)).toEqual(false)
  })
})
