import { UserActionTypes, getUserProfile, userProfileReceived } from './user.actions'
import { verifyAction, mockStoreAndDispatch, getAction } from '../../test-utils/actions.test-helper'

describe('user actions', () => {
  describe('should create an action', () => {
    it('to indicate the user profile was received', () => {
      verifyAction(UserActionTypes.USER_PROFILE_RECEIVED, '', userProfileReceived)
    })
  })

  describe('when dispatching getUserProfile action', () => {
    let getUserProfileSpy
    let state

    beforeEach(async () => {
      getUserProfileSpy = jest.fn()
      state = { root: { memoDashLib: { getUserProfile: getUserProfileSpy } } }
    })

    it('should call memoDashLib.getUserProfile', async () => {
      const actions = await mockStoreAndDispatch(state, getUserProfile())
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
})
