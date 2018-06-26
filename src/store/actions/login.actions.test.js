import { loginError, loginSuccessfull, login, LoginActionTypes } from './login.actions'
import { verifyAction, mockStoreAndDispatch, getAction } from '../../test-utils/actions.test-helper'

describe('login actions', () => {
  describe('should create an action', () => {
    it('to indicate a login error', () => {
      verifyAction(LoginActionTypes.LOGIN_ERROR, 'LoginError', loginError)
    })

    it('to indicate a successfull login', () => {
      verifyAction(LoginActionTypes.LOGIN_SUCCESSFULL, 'User1', loginSuccessfull)
    })
  })

  describe('when dispatching login action', () => {
    describe('memoDashLib wasnt initialized yet', () => {
      it('should dispatch loginError', async () => {
        const errorMessage = 'MemoDashLib isnt initialized yet'
        const state = { root: { memoDashLib: undefined } }

        const actions = await mockStoreAndDispatch(state, login('blockchainUsername'))
        expect(await getAction(actions, LoginActionTypes.LOGIN_ERROR)).toEqual(loginError(errorMessage))
      })
    })

    describe('memoDashLib already initialized', () => {
      let memoDashLib
      let state

      beforeEach(() => {
        memoDashLib = {
          searchBlockchainUsers: jest.fn(),
          login: jest.fn()
        }
        state = { root: { memoDashLib } }
      })

      it('should call memoDashLib.searchBlockchainUsers', async () => {
        await mockStoreAndDispatch(state, login('blockchainUsername'))
        expect(memoDashLib.searchBlockchainUsers).toHaveBeenCalled()
      })

      describe('no user found', () => {
        it('should not call memoDashLib.login', async () => {
          await mockStoreAndDispatch(state, login('blockchainUsername'))
          expect(memoDashLib.login).not.toHaveBeenCalled()
        })

        it('should dispatch loginError', async () => {
          const errorMessage = `User blockchainUsername not found on blockchain`
          memoDashLib.searchBlockchainUsers.mockReturnValue([])
  
          const actions = await mockStoreAndDispatch(state, login('blockchainUsername'))
          expect(await getAction(actions, LoginActionTypes.LOGIN_ERROR)).toEqual(loginError(errorMessage))
        })
      })

      it('should call memoDashLib.login if a user was found', async () => {
        memoDashLib.searchBlockchainUsers.mockReturnValue([{}])
        await mockStoreAndDispatch(state, login('blockchainUsername'))
        expect(memoDashLib.login).toHaveBeenCalled()
      })

      it('should dispatch loginSuccessfull if the login was successfull', async () => {
        memoDashLib.searchBlockchainUsers.mockReturnValue([{ name: 'Name' }])
        const actions = await mockStoreAndDispatch(state, login('blockchainUsername'))
        expect(await getAction(actions, LoginActionTypes.LOGIN_SUCCESSFULL)).toEqual(loginSuccessfull('Name'))
      })

      it('should dispatch loginError if the login was not successfull', async () => {
        memoDashLib.searchBlockchainUsers.mockReturnValue([{ name: 'Name' }])
        memoDashLib.login = jest.fn().mockImplementation(() => Promise.reject(new Error('LoginError')))

        const actions = await mockStoreAndDispatch(state, login('blockchainUsername'))
        expect(await getAction(actions, LoginActionTypes.LOGIN_ERROR)).toEqual(loginError('LoginError'))
      })
    })
  })
})
