import * as userActions from './user.actions'
import { UserActionTypes } from './user.actions'
import { verifyAction, mockStoreAndDispatch, getAction } from '../../test-utils/actions.test-helper'
import testUsers from '../../test-utils/test-users'
import { filterUser } from '../../lib/helpers'

jest.mock('../../lib/helpers')

describe('user actions', () => {
  let username = 'alice'

  describe('should create an action', () => {
    it('to indicate the user was updated', () => {
      verifyAction(UserActionTypes.USER_UPDATED, { username, props: '' }, () =>
        userActions.userUpdated(username, '')
      )
    })

    it('to indicate the user was received', () => {
      verifyAction(UserActionTypes.USER_RECEIVED, '', userActions.userReceived)
    })

    it('to indicate all memos were received', () => {
      verifyAction(UserActionTypes.ALL_MEMOS_RECEIVED, 'memos', () => userActions.allMemosReceived('memos'))
    })

    it('to indicate the memo was updated', () => {
      verifyAction(UserActionTypes.MEMO_UPDATED, 'memo', () => userActions.memoUpdated('memo'))
    })
  })

  describe('when dispatching action', () => {
    let spies
    let state

    beforeEach(async () => {
      spies = {
        getUser: jest.fn(),
        getMemosForUser: jest.fn(),
        getAllMemos: jest.fn(),
        likeMemo: jest.fn(),
        removeLike: jest.fn(),
        getMemo: jest.fn(),
        getAllOwnLikes: jest.fn(),
        replyToMemo: jest.fn()
      }
      state = {
        root: {
          memoDashLib: {
            ...spies
          }
        },
        user: { currentUser: username, users: testUsers }
      }
    })

    describe('User', () => {
      it('should call memoDashLib.getuser', async () => {
        await mockStoreAndDispatch(state, userActions.getUser())
        expect(spies.getUser).toHaveBeenCalled()
      })

      it('should dispatch userReceived', async () => {
        const user = 'user'
        state.root.memoDashLib.getUser.mockReturnValue(user)
        const actions = await mockStoreAndDispatch(state, userActions.getUser())
        expect(await getAction(actions, UserActionTypes.USER_RECEIVED)).toEqual(
          userActions.userReceived(user)
        )
      })
    })

    describe('Memos', () => {
      describe('getMemosForUser(username)', () => {
        it('should call memoDashLib.getMemosForUser', async () => {
          await mockStoreAndDispatch(state, userActions.getMemosForUser())
          expect(spies.getMemosForUser).toHaveBeenCalled()
        })

        it('should dispatch userUpdated', async () => {
          const memos = 'memos'
          const username = 'username'
          state.root.memoDashLib.getMemosForUser.mockReturnValue(memos)
          const actions = await mockStoreAndDispatch(state, userActions.getMemosForUser(username))
          expect(await getAction(actions, UserActionTypes.USER_UPDATED)).toEqual(
            userActions.userUpdated(username, { memos })
          )
        })
      })

      describe('getAllMemos()', () => {
        it('should call memoDashLib.getAllMemos', async () => {
          await mockStoreAndDispatch(state, userActions.getAllMemos())
          expect(spies.getAllMemos).toHaveBeenCalled()
        })

        it('should dispatch allMemosReceived', async () => {
          const memos = 'memos'
          state.root.memoDashLib.getAllMemos.mockReturnValue(memos)
          const actions = await mockStoreAndDispatch(state, userActions.getAllMemos())
          expect(await getAction(actions, UserActionTypes.ALL_MEMOS_RECEIVED)).toEqual(
            userActions.allMemosReceived(memos)
          )
        })
      })

      describe('likeMemo(username, memoId)', () => {
        const memoId = 1

        it('should call memoDashLib.likeMemo', async () => {
          await mockStoreAndDispatch(state, userActions.likeMemo(username, memoId))
          expect(spies.likeMemo).toHaveBeenCalledWith(username, memoId)
        })

        it('should call memoDashLib.getMemo', async () => {
          await mockStoreAndDispatch(state, userActions.likeMemo(username, memoId))
          expect(spies.getMemo).toHaveBeenCalledWith(username, memoId)
        })

        it('should dispatch memoUpdated', async () => {
          const memo = 'memo'
          state.root.memoDashLib.getMemo.mockReturnValue(memo)
          const actions = await mockStoreAndDispatch(state, userActions.likeMemo())
          expect(await getAction(actions, UserActionTypes.MEMO_UPDATED)).toEqual(
            userActions.memoUpdated(memo)
          )
        })

        it('should dispatch userUpdated', async () => {
          state.root.memoDashLib.getAllOwnLikes.mockReturnValue('ownLikes')
          const actions = await mockStoreAndDispatch(state, userActions.likeMemo(username, memoId))
          expect(await getAction(actions, UserActionTypes.USER_UPDATED)).toEqual(
            userActions.userUpdated(username, { ownLikes: 'ownLikes' })
          )
        })
      })

      describe('removeLike(likeId)', () => {
        const alice = filterUser('alice')
        const likeToRemove = alice.ownLikes[0]

        it('should call memoDashLib.removeLike', async () => {
          await mockStoreAndDispatch(
            state,
            userActions.removeLike(alice.username, likeToRemove.relation.index)
          )
          expect(spies.removeLike).toHaveBeenCalledWith(likeToRemove.idx)
        })

        it('should call memoDashLib.getMemo', async () => {
          await mockStoreAndDispatch(
            state,
            userActions.removeLike(alice.username, likeToRemove.relation.index)
          )
          expect(spies.getMemo).toHaveBeenCalledWith(alice.username, likeToRemove.relation.index)
        })

        it('should dispatch likeRemoved', async () => {
          const actions = await mockStoreAndDispatch(
            state,
            userActions.removeLike(alice.username, likeToRemove.relation.index)
          )
          expect(await getAction(actions, UserActionTypes.LIKE_REMOVED)).toEqual(
            userActions.likeRemoved(likeToRemove.idx)
          )
        })

        it('should dispatch memoUpdated', async () => {
          const memo = alice.memos[0]
          state.root.memoDashLib.getMemo.mockReturnValue(alice.memos[0])
          const actions = await mockStoreAndDispatch(
            state,
            userActions.removeLike(alice.username, likeToRemove.relation.index)
          )
          expect(await getAction(actions, UserActionTypes.MEMO_UPDATED)).toEqual(
            userActions.memoUpdated(memo)
          )
        })
      })

      describe('replyToMemo(username, memoId, message)', () => {
        const alice = filterUser('alice')
        const memo = alice.memos[0]
        const replyMessage = 'replyMessage'

        it('should call memoDashLib.removeLike', async () => {
          await mockStoreAndDispatch(state, userActions.replyToMemo(alice.username, memo.idx, replyMessage))
          expect(spies.replyToMemo).toHaveBeenCalledWith(alice.username, memo.idx, replyMessage)
        })

        it('should call memoDashLib.getMemo', async () => {
          await mockStoreAndDispatch(state, userActions.replyToMemo(alice.username, memo.idx, replyMessage))
          expect(spies.getMemo).toHaveBeenCalledWith(alice.username, memo.idx)
        })

        it('should dispatch memoUpdated', async () => {
          state.root.memoDashLib.getMemo.mockReturnValue(memo)
          const actions = await mockStoreAndDispatch(
            state,
            userActions.replyToMemo(alice.username, memo.idx, replyMessage)
          )
          expect(await getAction(actions, UserActionTypes.MEMO_UPDATED)).toEqual(
            userActions.memoUpdated(memo)
          )
        })
      })
    })
  })
})
