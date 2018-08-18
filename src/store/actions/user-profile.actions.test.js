import * as userProfileActions from './user-profile.actions'
import * as userActions from './user.actions'
import { MemoActionTypes } from './memo.actions'
import { verifyAction, mockStoreAndDispatch, getAction } from '../../test-utils/actions.test-helper'
import testUsers from '../../test-utils/test-users'
import { UserProfileActionTypes } from './user-profile.actions'

jest.mock('./user.actions', () => {
  const lib = require.requireActual('./user.actions')
  return { ...lib, getUsers: jest.fn().mockReturnValue({ type: 'USERS_RECEIVED' }) }
})

describe('user profile actions', () => {
  describe('should create an action', () => {
    it('to indicate user profiles were received', () => {
      verifyAction(UserProfileActionTypes.USER_PROFILE_RECEIVED, 'userProfiles', () =>
        userProfileActions.userProfilesReceived('userProfiles')
      )
    })
  })
})
