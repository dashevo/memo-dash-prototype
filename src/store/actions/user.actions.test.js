import {
  UserActionTypes,
  getUserProfile,
  userProfileReceived,
  getOwnMemos,
  ownMemosReceived,
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
    let getOwnMemosSpy
    let getAllMemosSpy
    let state

    beforeEach(async () => {
      getUserProfileSpy = jest.fn()
      getOwnMemosSpy = jest.fn()
      getAllMemosSpy = jest.fn()
      state = {
        root: {
          memoDashLib: {
            getUserProfile: getUserProfileSpy,
            getOwnMemos: getOwnMemosSpy,
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
        await mockStoreAndDispatch(state, getOwnMemos())
        expect(getOwnMemosSpy).toHaveBeenCalled()
      })

      it('should dispatch ownMemosReceived', async () => {
        const memos = 'memos'
        state.root.memoDashLib.getOwnMemos.mockReturnValue(memos)
        const actions = await mockStoreAndDispatch(state, getOwnMemos())
        expect(await getAction(actions, UserActionTypes.OWN_MEMOS_RECEIVED)).toEqual(ownMemosReceived(memos))
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
