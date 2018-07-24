import {
  UserActionTypes,
  getUserProfile,
  userProfileReceived,
  getMemosForUser,
  memosForUserReceived,
  getAllMemos,
  allMemosReceived
} from './user.actions'
import { verifyAction, mockStoreAndDispatch, getAction } from '../../test-utils/actions.test-helper'

describe('user actions', () => {
  describe('should create an action', () => {
    it('to indicate the user profile was received', () => {
      verifyAction(UserActionTypes.USER_PROFILE_RECEIVED, '', userProfileReceived)
    })
  })

  describe('when dispatching getUserProfile action', () => {
    let getUserProfileSpy
    let getMemosForUserSpy
    let getAllMemosSpy
    let state

    beforeEach(async () => {
      getUserProfileSpy = jest.fn()
      getMemosForUserSpy = jest.fn()
      getAllMemosSpy = jest.fn()
      state = {
        root: {
          memoDashLib: {
            getUserProfile: getUserProfileSpy,
            getMemosForUser: getMemosForUserSpy,
            getAllMemos: getAllMemosSpy
          }
        }
      }
    })

    describe('User profile', () => {
      it('should call memoDashLib.getUserProfile', async () => {
        await mockStoreAndDispatch(state, getUserProfile())
        expect(getUserProfileSpy).toHaveBeenCalled()
      })

      it('should dispatch userProfileReceived', async () => {
        const userProfile = 'userProfile'
        state.root.memoDashLib.getUserProfile.mockReturnValue(userProfile)
        const actions = await mockStoreAndDispatch(state, getUserProfile())
        expect(await getAction(actions, UserActionTypes.USER_PROFILE_RECEIVED)).toEqual(
          userProfileReceived(userProfile)
        )
      })
    })

    describe('Memos', () => {
      it('should call memoDashLib.getOwnMemos', async () => {
        await mockStoreAndDispatch(state, getMemosForUser())
        expect(getMemosForUserSpy).toHaveBeenCalled()
      })

      it('should dispatch memosForUserReceived', async () => {
        const memos = 'memos'
        const username = 'username'
        state.root.memoDashLib.getMemosForUser.mockReturnValue(memos)
        const actions = await mockStoreAndDispatch(state, getMemosForUser(username))
        expect(await getAction(actions, UserActionTypes.MEMOS_FOR_USER_RECEIVED)).toEqual(
          memosForUserReceived(username, memos)
        )
      })

      it('should call memoDashLib.getAllMemos', async () => {
        await mockStoreAndDispatch(state, getAllMemos())
        expect(getAllMemosSpy).toHaveBeenCalled()
      })

      it('should dispatch allMemosReceived', async () => {
        const memos = 'memos'
        state.root.memoDashLib.getAllMemos.mockReturnValue(memos)
        const actions = await mockStoreAndDispatch(state, getAllMemos())
        expect(await getAction(actions, UserActionTypes.ALL_MEMOS_RECEIVED)).toEqual(allMemosReceived(memos))
      })
    })
  })
})
