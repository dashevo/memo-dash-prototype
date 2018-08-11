import * as userActions from './user.actions'
import { UserActionTypes } from './user.actions'
import { verifyAction, mockStoreAndDispatch, getAction } from '../../test-utils/actions.test-helper'
import testUsers from '../../test-utils/test-users'

describe('user actions', () => {
  const username = 'alice'

  describe('should create an action', () => {
    it('to indicate the user was updated', () => {
      verifyAction(UserActionTypes.USER_UPDATED, { username, props: '' }, () =>
        userActions.userUpdated(username, '')
      )
    })

    it('to indicate the user was received', () => {
      verifyAction(UserActionTypes.USER_RECEIVED, '', userActions.userReceived)
    })

    it('to indicate multiple users were received', () => {
      verifyAction(UserActionTypes.USERS_RECEIVED, '', userActions.usersReceived)
    })
  })

  describe('when dispatching action', () => {
    let spies
    let state

    beforeEach(async () => {
      spies = {
        getUser: jest.fn(),
        getUsers: jest.fn(),
        getAllOwnLikes: jest.fn()
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
      describe('getUser', () => {
        it('should call memoDashLib.getuser', async () => {
          await mockStoreAndDispatch(state, userActions.getUser())
          expect(spies.getUser).toHaveBeenCalled()
        })

        it('should dispatch userReceived', async () => {
          const user = testUsers['alice']
          state.root.memoDashLib.getUser.mockReturnValue(user)
          const actions = await mockStoreAndDispatch(state, userActions.getUser())
          expect(await getAction(actions, UserActionTypes.USER_RECEIVED)).toEqual(
            userActions.userReceived(user)
          )
        })
      })

      describe('getUsers', () => {
        it('should call memoDashLib.getusers', async () => {
          await mockStoreAndDispatch(state, userActions.getUsers())
          expect(spies.getUsers).toHaveBeenCalled()
        })

        it('should dispatch usersReceived', async () => {
          const users = [testUsers['alice'], testUsers['bob']]
          state.root.memoDashLib.getUsers.mockReturnValue(users)
          const actions = await mockStoreAndDispatch(state, userActions.getUsers())
          expect(await getAction(actions, UserActionTypes.USERS_RECEIVED)).toEqual(
            userActions.usersReceived(users)
          )
        })
      })

      describe('getAllOwnLikes', () => {
        it('should call memoDashLib.getAllOwnLikes', async () => {
          await mockStoreAndDispatch(state, userActions.getAllOwnLikes())
          expect(spies.getAllOwnLikes).toHaveBeenCalled()
        })

        it('should dispatch userUpdated', async () => {
          const user = testUsers['alice']
          const ownLikes = user.ownLikes
          state.root.memoDashLib.getAllOwnLikes.mockReturnValue(ownLikes)
          const actions = await mockStoreAndDispatch(state, userActions.getAllOwnLikes())
          expect(await getAction(actions, UserActionTypes.USER_UPDATED)).toEqual(
            userActions.userUpdated(user.username, { ownLikes })
          )
        })
      })
    })
  })
})
