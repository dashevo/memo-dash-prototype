import * as userProfileActions from './user-profile.actions'
import * as userActions from './user.actions'
import { verifyAction, mockStoreAndDispatch, getAction } from '../../test-utils/actions.test-helper'
import { testUsers } from '../../test-utils/test-data'
import { UserActionTypes } from './user.actions'
import { getMissingUsers } from '../selectors'

jest.mock('../selectors', () => {
  const lib = require.requireActual('../selectors')
  return { ...lib, getMissingUsers: jest.fn(() => jest.fn().mockReturnValue(['charlie'])) }
})

describe('user profile actions', () => {
  const alice = testUsers['alice']
  const bob = testUsers['bob']

  describe('when dispatching action', () => {
    let spies
    let state

    beforeEach(async () => {
      spies = {
        getUserFollowers: jest.fn(),
        getUserFollowing: jest.fn(),
        getUsers: jest.fn()
      }

      state = {
        root: {
          memoDashLib: {
            ...spies
          }
        },
        user: {
          users: testUsers
        }
      }
    })

    describe('getFollowersForUser(username)', () => {
      it('should call memoDashLib.getUserFollowers', async () => {
        await mockStoreAndDispatch(state, userProfileActions.getFollowersForUser(alice.username))
        expect(spies.getUserFollowers).toHaveBeenCalled()
      })

      it('should dispatch userUpdated', async () => {
        state.root.memoDashLib.getUserFollowers.mockReturnValue([bob])
        const actions = await mockStoreAndDispatch(
          state,
          userProfileActions.getFollowersForUser(alice.username)
        )
        expect(await getAction(actions, UserActionTypes.USER_UPDATED)).toEqual(
          userActions.userUpdated(alice.username, { followers: [bob.username] })
        )
      })

      it('should get missing users from lib', async () => {
        state.root.memoDashLib.getUserFollowers.mockReturnValue([bob])
        await mockStoreAndDispatch(state, userProfileActions.getFollowersForUser(alice.username))
        expect(spies.getUsers).toHaveBeenCalledWith(['charlie'])
      })
    })

    describe('getFollowingForUser(username)', () => {
      it('should call memoDashLib.getUserFollowing', async () => {
        await mockStoreAndDispatch(state, userProfileActions.getFollowingForUser(alice.username))
        expect(spies.getUserFollowing).toHaveBeenCalled()
      })

      it('should dispatch userUpdated', async () => {
        state.root.memoDashLib.getUserFollowing.mockReturnValue([bob])
        const actions = await mockStoreAndDispatch(
          state,
          userProfileActions.getFollowingForUser(alice.username)
        )
        expect(await getAction(actions, UserActionTypes.USER_UPDATED)).toEqual(
          userActions.userUpdated(alice.username, { following: [bob.username] })
        )
      })

      it('should get missing users from lib', async () => {
        state.root.memoDashLib.getUserFollowing.mockReturnValue([bob])
        await mockStoreAndDispatch(state, userProfileActions.getFollowingForUser(alice.username))
        expect(spies.getUsers).toHaveBeenCalledWith(['charlie'])
      })
    })
  })
})
