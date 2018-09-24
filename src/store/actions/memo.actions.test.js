import * as memoActions from './memo.actions'
import * as userActions from './user.actions'
import { MemoActionTypes } from './memo.actions'
import { verifyAction, mockStoreAndDispatch, getAction } from '../../test-utils/actions.test-helper'
import { testUsers, testMemos } from '../../test-utils/test-data'
import { combineMemoId } from '../reducers/memo.reducer'

import * as userSelectors from '../selectors/user.selector'

jest.mock('./user.actions', () => {
  const lib = require.requireActual('./user.actions')
  return { ...lib, getUsers: jest.fn().mockReturnValue({ type: 'USERS_RECEIVED' }) }
})

describe('memo actions', () => {
  describe('should create an action', () => {
    it('to indicate memos were received', () => {
      verifyAction(MemoActionTypes.MEMOS_RECEIVED, 'memos', () => memoActions.memosReceived('memos'))
    })

    it('to indicate the memo was updated', () => {
      verifyAction(MemoActionTypes.MEMO_UPDATED, 'memo', () => memoActions.memoUpdated('memo'))
    })

    it('to indicate a like was removed', () => {
      verifyAction(MemoActionTypes.LIKE_REMOVED, 'likeId', () => memoActions.likeRemoved('likeId'))
    })

    it('to indicate a memo was deleted', () => {
      verifyAction(MemoActionTypes.MEMO_DELETED, 'memoId', () => memoActions.memoDeleted('memoId'))
    })

    it('to indicate memo replies were received', () => {
      const payload = {
        memoId: 'memoId',
        replies: [],
        username: 'username'
      }

      expect(memoActions.memoRepliesReceived(payload.username, payload.memoId, payload.replies)).toEqual({
        type: MemoActionTypes.MEMO_REPLIES_RECEIVED,
        payload
      })
    })
  })

  describe('when dispatching action', () => {
    let spies
    let state
    const username = 'alice'

    beforeEach(async () => {
      spies = {
        getMemosForUser: jest.fn(),
        getMemos: jest.fn(),
        likeMemo: jest.fn(),
        removeLike: jest.fn(),
        getUserLikes: jest.fn(),
        getMemo: jest.fn(),
        replyToMemo: jest.fn(),
        getMemoReplies: jest.fn(),
        postMemo: jest.fn(),
        getUsers: jest.fn(),
        deleteMemo: jest.fn(),
        editMemo: jest.fn()
      }
      state = {
        root: {
          memoDashLib: {
            ...spies
          }
        },
        user: { currentUser: username, users: testUsers },
        memo: {
          memos: testMemos
        }
      }
    })

    describe('Memos', () => {
      const alice = testUsers['alice']
      let memos = []
      alice.memoIds.forEach(memoId => memos.push(testMemos[memoId]))

      describe('getMemosForUser(username)', () => {
        it('should call memoDashLib.getMemosForUser', async () => {
          await mockStoreAndDispatch(state, memoActions.getMemosForUser())
          expect(spies.getMemosForUser).toHaveBeenCalled()
        })

        it('should dispatch userUpdated', async () => {
          state.root.memoDashLib.getMemosForUser.mockReturnValue(memos)
          const actions = await mockStoreAndDispatch(state, memoActions.getMemosForUser(alice.username))
          expect(await getAction(actions, userActions.UserActionTypes.USER_UPDATED)).toEqual(
            userActions.userUpdated(alice.username, { memoIds: alice.memoIds })
          )
        })
      })

      describe('getMemos()', () => {
        it('should call memoDashLib.getMemos', async () => {
          await mockStoreAndDispatch(state, memoActions.getMemos())
          expect(spies.getMemos).toHaveBeenCalled()
        })

        describe('received memos', () => {
          const user = testUsers['alice']

          it('should dispatch memosReceived', async () => {
            state.root.memoDashLib.getMemos.mockReturnValue(memos)
            const actions = await mockStoreAndDispatch(state, memoActions.getMemos())
            expect(await getAction(actions, MemoActionTypes.MEMOS_RECEIVED)).toEqual(
              memoActions.memosReceived(memos)
            )
          })

          it('should dispatch getUsers', async () => {
            state.root.memoDashLib.getMemos.mockReturnValue(memos)
            userSelectors.getMissingUsers = jest.fn(() => jest.fn().mockReturnValue(['charlie']))
            const actions = await mockStoreAndDispatch(state, memoActions.getMemos())
            expect(await getAction(actions, userActions.UserActionTypes.USERS_RECEIVED)).toEqual(
              userActions.getUsers([user.username])
            )
          })

          it('should not dispatch getUsers if all users already available', async () => {
            state.root.memoDashLib.getMemos.mockReturnValue(memos)
            const actions = await mockStoreAndDispatch(state, memoActions.getMemos())
            expect(await getAction(actions, userActions.UserActionTypes.USERS_RECEIVED)).toEqual(
              userActions.getUsers([user.username])
            )
          })
        })

        describe('no memos received', () => {
          it('should not dispatch anything ', async () => {
            state.root.memoDashLib.getMemos.mockReturnValue(undefined)
            const actions = await mockStoreAndDispatch(state, memoActions.getMemos())
            expect(actions.length).toEqual(0)
          })
        })
      })

      describe('postMemo(message)', () => {
        it('should call memoDashLib.postMemo', async () => {
          const message = 'message'
          await mockStoreAndDispatch(state, memoActions.postMemo(message))
          expect(spies.postMemo).toHaveBeenCalledWith(message)
        })

        it('should dispatch getMemos', async () => {
          const message = 'message'
          await mockStoreAndDispatch(state, memoActions.postMemo(message))
          expect(spies.getMemos).toHaveBeenCalled()
        })
      })

      describe('likeMemo(username, memoId)', () => {
        const memoId = 1

        it('should call memoDashLib.likeMemo', async () => {
          await mockStoreAndDispatch(state, memoActions.likeMemo(username, memoId))
          expect(spies.likeMemo).toHaveBeenCalledWith(username, memoId)
        })

        it('should call memoDashLib.getMemo', async () => {
          await mockStoreAndDispatch(state, memoActions.likeMemo(username, memoId))
          expect(spies.getMemo).toHaveBeenCalledWith(username, memoId)
        })

        it('should dispatch memoUpdated', async () => {
          const memo = 'memo'
          state.root.memoDashLib.getMemo.mockReturnValue(memo)
          const actions = await mockStoreAndDispatch(state, memoActions.likeMemo())
          expect(await getAction(actions, MemoActionTypes.MEMO_UPDATED)).toEqual(
            memoActions.memoUpdated(memo)
          )
        })

        it('should dispatch userUpdated', async () => {
          state.root.memoDashLib.getAllOwnLikes.mockReturnValue('ownLikes')
          const actions = await mockStoreAndDispatch(state, memoActions.likeMemo(username, memoId))
          expect(await getAction(actions, userActions.UserActionTypes.USER_UPDATED)).toEqual(
            userActions.userUpdated(username, { ownLikes: 'ownLikes' })
          )
        })
      })

      describe('removeLike(likeId)', () => {
        const alice = testUsers['alice']
        const likeToRemove = alice.likes[0]

        it('should call memoDashLib.removeLike', async () => {
          await mockStoreAndDispatch(
            state,
            memoActions.removeLike(alice.username, likeToRemove.relation.index)
          )
          expect(spies.removeLike).toHaveBeenCalledWith(likeToRemove.idx)
        })

        it('should call memoDashLib.getMemo', async () => {
          await mockStoreAndDispatch(
            state,
            memoActions.removeLike(alice.username, likeToRemove.relation.index)
          )
          expect(spies.getMemo).toHaveBeenCalledWith(alice.username, likeToRemove.relation.index)
        })

        it('should dispatch likeRemoved', async () => {
          const actions = await mockStoreAndDispatch(
            state,
            memoActions.removeLike(alice.username, likeToRemove.relation.index)
          )
          expect(await getAction(actions, MemoActionTypes.LIKE_REMOVED)).toEqual(
            memoActions.likeRemoved(likeToRemove.idx)
          )
        })

        it('should dispatch memoUpdated', async () => {
          const memo = testMemos[alice.memoIds[0]]
          state.root.memoDashLib.getMemo.mockReturnValue(memo)
          const actions = await mockStoreAndDispatch(
            state,
            memoActions.removeLike(alice.username, likeToRemove.relation.index)
          )
          expect(await getAction(actions, MemoActionTypes.MEMO_UPDATED)).toEqual(
            memoActions.memoUpdated(memo)
          )
        })
      })

      describe('replyToMemo(username, memoId, message)', () => {
        const alice = testUsers['alice']
        const memo = testMemos[alice.memoIds[0]]
        const replyMessage = 'replyMessage'

        it('should call memoDashLib.replyToMemo', async () => {
          await mockStoreAndDispatch(state, memoActions.replyToMemo(alice.username, memo.idx, replyMessage))
          expect(spies.replyToMemo).toHaveBeenCalledWith(alice.username, memo.idx, replyMessage)
        })

        it('should call memoDashLib.getMemo', async () => {
          await mockStoreAndDispatch(state, memoActions.replyToMemo(alice.username, memo.idx, replyMessage))
          expect(spies.getMemo).toHaveBeenCalledWith(alice.username, memo.idx)
        })

        it('should call memoDashLib.getMemoReplies', async () => {
          await mockStoreAndDispatch(state, memoActions.replyToMemo(alice.username, memo.idx, replyMessage))
          expect(spies.getMemoReplies).toHaveBeenCalledWith(alice.username, memo.idx)
        })

        it('should call memoDashLib.getMemosForUser', async () => {
          await mockStoreAndDispatch(state, memoActions.replyToMemo(alice.username, memo.idx, replyMessage))
          expect(spies.getMemosForUser).toHaveBeenCalledWith(alice.username)
        })

        it('should dispatch memoUpdated', async () => {
          state.root.memoDashLib.getMemo.mockReturnValue(memo)
          const actions = await mockStoreAndDispatch(
            state,
            memoActions.replyToMemo(alice.username, memo.idx, replyMessage)
          )
          expect(await getAction(actions, MemoActionTypes.MEMO_UPDATED)).toEqual(
            memoActions.memoUpdated(memo)
          )
        })
      })

      describe('getMemoReplies(username, memoId)', () => {
        const alice = testUsers['alice']
        const memo = testMemos[alice.memoIds[0]]

        it('should call memoDashLib.getMemoReplies', async () => {
          await mockStoreAndDispatch(state, memoActions.getMemoReplies(alice.username, memo.idx))
          expect(spies.getMemoReplies).toHaveBeenCalledWith(alice.username, memo.idx)
        })

        it('should dispatch memoRepliesReceived', async () => {
          state.root.memoDashLib.getMemoReplies.mockReturnValue([memo])
          const actions = await mockStoreAndDispatch(
            state,
            memoActions.getMemoReplies(alice.username, memo.idx)
          )
          expect(await getAction(actions, MemoActionTypes.MEMO_REPLIES_RECEIVED)).toEqual(
            memoActions.memoRepliesReceived(alice.username, memo.idx, [memo])
          )
        })
      })

      describe('deleteMemo(memoId)', () => {
        const alice = testUsers['alice']
        const memo = testMemos[alice.memoIds[0]]

        it('should call memoDashLib.deleteMemo', async () => {
          await mockStoreAndDispatch(state, memoActions.deleteMemo(memo.username, memo.idx))
          expect(spies.deleteMemo).toHaveBeenCalledWith(memo.idx)
        })

        it('should dispatch memoDeleted', async () => {
          const actions = await mockStoreAndDispatch(state, memoActions.deleteMemo(memo.username, memo.idx))

          expect(await getAction(actions, MemoActionTypes.MEMO_DELETED)).toEqual(
            memoActions.memoDeleted(combineMemoId(memo.username, memo.idx))
          )
        })
      })

      describe('editMemo(username, memoId, message)', () => {
        const alice = testUsers['alice']
        const memo = testMemos[alice.memoIds[0]]
        const newMessage = 'newMessage'

        it('should call memoDashLib.editMemo', async () => {
          await mockStoreAndDispatch(state, memoActions.editMemo(alice.username, memo.idx, newMessage))
          expect(spies.editMemo).toHaveBeenCalledWith(memo.idx, newMessage)
        })

        it('should dispatch memoUpdated', async () => {
          state.root.memoDashLib.getMemo.mockReturnValue(memo)
          const actions = await mockStoreAndDispatch(
            state,
            memoActions.replyToMemo(alice.username, memo.idx, newMessage)
          )
          expect(await getAction(actions, MemoActionTypes.MEMO_UPDATED)).toEqual(
            memoActions.memoUpdated(memo)
          )
        })
      })
    })
  })
})
