import * as userProfileActions from './user-profile.actions'
import * as userActions from './user.actions'
import { mockStoreAndDispatch } from '../../test-utils/actions.test-helper'
import { testUsers } from '../../test-utils/test-data'
import * as userSelectors from '../selectors/user.selector'

describe('user profile actions', () => {
  const alice = testUsers['alice']
  const bob = testUsers['bob']

  describe('when dispatching action', () => {
    let spies
    let state

    beforeEach(async () => {
      userSelectors.getUserFollowers = jest.fn(() => jest.fn().mockReturnValue([bob.username, 'charlie']))
      userSelectors.getUserFollowing = jest.fn(() => jest.fn().mockReturnValue([bob.username, 'charlie']))
      userSelectors.getMissingUsers = jest.fn(() => jest.fn().mockReturnValue(['charlie']))
      userActions.getUsers = jest.fn(() => jest.fn())

      spies = {
        followUser: jest.fn(),
        unFollowUser: jest.fn()
      }

      state = {
        root: {
          memoDashLib: {
            ...spies
          }
        },
        user: {
          currentUser: alice.username,
          users: testUsers
        }
      }
    })

    describe('getFollowersForUser(username)', () => {
      it('should get user followers from state', async () => {
        await mockStoreAndDispatch(state, userProfileActions.getFollowersForUser(alice.username))
        expect(userSelectors.getUserFollowers).toHaveBeenCalledWith(alice.username)
      })

      it('should get missing users from state', async () => {
        await mockStoreAndDispatch(state, userProfileActions.getFollowersForUser(alice.username))
        expect(userSelectors.getMissingUsers).toHaveBeenCalledWith([bob.username, 'charlie'])
      })

      it('should dispatch getUsers', async () => {
        await mockStoreAndDispatch(state, userProfileActions.getFollowersForUser(alice.username))
        expect(userActions.getUsers).toHaveBeenCalledWith(['charlie'])
      })
    })

    describe('getFollowingForUser(username)', () => {
      it('should get user following from state', async () => {
        await mockStoreAndDispatch(state, userProfileActions.getFollowingForUser(alice.username))
        expect(userSelectors.getUserFollowing).toHaveBeenCalledWith(alice.username)
      })

      it('should get missing users from state', async () => {
        await mockStoreAndDispatch(state, userProfileActions.getFollowingForUser(alice.username))
        expect(userSelectors.getMissingUsers).toHaveBeenCalledWith([bob.username, 'charlie'])
      })

      it('should dispatch getUsers', async () => {
        await mockStoreAndDispatch(state, userProfileActions.getFollowingForUser(alice.username))
        expect(userActions.getUsers).toHaveBeenCalledWith(['charlie'])
      })
    })

    describe('followUser(username)', () => {
      it('should call lib.followUser(username)', async () => {
        await mockStoreAndDispatch(state, userProfileActions.followUser(alice.username))
        expect(spies.followUser).toHaveBeenCalledWith(alice.username)
      })

      it('should dispatch getUsers', async () => {
        await mockStoreAndDispatch(state, userProfileActions.followUser(bob.username))
        expect(userActions.getUsers).toHaveBeenCalledWith([bob.username, alice.username])
      })
    })

    describe('unFollowUser(username)', () => {
      it('should call lib.unFollowUser(username)', async () => {
        await mockStoreAndDispatch(state, userProfileActions.unFollowUser(alice.username))
        expect(spies.unFollowUser).toHaveBeenCalledWith(alice.username)
      })

      it('should dispatch getUsers', async () => {
        await mockStoreAndDispatch(state, userProfileActions.unFollowUser(bob.username))
        expect(userActions.getUsers).toHaveBeenCalledWith([bob.username, alice.username])
      })
    })
  })
})
