import {
  loginError,
  loginSuccessfull,
  login,
  logoutError,
  logoutSuccessfull,
  logout,
  AuthActionTypes
} from './auth.actions'
import { verifyAction, mockStoreAndDispatch, getAction } from '../../test-utils/actions.test-helper'

describe('auth actions', () => {
  describe('should create an action', () => {
    it('to indicate a login error', () => {
      verifyAction(AuthActionTypes.LOGIN_ERROR, 'LoginError', loginError)
    })

    it('to indicate a successfull login', () => {
      verifyAction(AuthActionTypes.LOGIN_SUCCESSFULL, 'User1', loginSuccessfull)
    })

    it('to indicate a logout error', () => {
      verifyAction(AuthActionTypes.LOGOUT_ERROR, 'LogoutError', logoutError)
    })

    it('to indicate a successfull logout', () => {
      verifyAction(AuthActionTypes.LOGOUT_SUCCESSFULL, undefined, logoutSuccessfull)
    })
  })

  describe('memoDashLib wasnt initialized yet', () => {
    describe('when dispatching login action', () => {
      it('should dispatch loginError', async () => {
        const errorMessage = 'MemoDashLib isnt initialized yet'
        const state = { root: { memoDashLib: undefined } }

        const actions = await mockStoreAndDispatch(state, login('blockchainUsername'))
        expect(await getAction(actions, AuthActionTypes.LOGIN_ERROR)).toEqual(loginError(errorMessage))
      })
    })

    describe('when dispatching logout action', () => {
      it('should dispatch loginError', async () => {
        const errorMessage = 'MemoDashLib isnt initialized yet'
        const state = { root: { memoDashLib: undefined } }

        const actions = await mockStoreAndDispatch(state, logout())
        expect(await getAction(actions, AuthActionTypes.LOGOUT_ERROR)).toEqual(logoutError(errorMessage))
      })
    })
  })

  describe('memoDashLib already initialized', () => {
    let memoDashLib
    let state

    beforeEach(() => {
      memoDashLib = {
        searchBlockchainUsers: jest.fn(),
        login: jest.fn(),
        logout: jest.fn(),
        getUserProfile: jest.fn()
      }
      state = { root: { memoDashLib } }
    })

    describe('when dispatching logout action', () => {
      it('should call memoDashLib.logout', async () => {
        await mockStoreAndDispatch(state, logout())
        expect(memoDashLib.logout).toHaveBeenCalled()
      })

      it('should dispatch logoutSuccessfull if the logout was successfull', async () => {
        const actions = await mockStoreAndDispatch(state, logout())
        expect(await getAction(actions, AuthActionTypes.LOGOUT_SUCCESSFULL)).toEqual(logoutSuccessfull())
      })

      it('should dispatch logoutError if the logout was not successfull', async () => {
        memoDashLib.logout = jest.fn().mockImplementation(() => Promise.reject(new Error('LogoutError')))

        const actions = await mockStoreAndDispatch(state, logout())
        expect(await getAction(actions, AuthActionTypes.LOGOUT_ERROR)).toEqual(logoutError('LogoutError'))
      })
    })

    describe('when dispatching login action', () => {
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
          expect(await getAction(actions, AuthActionTypes.LOGIN_ERROR)).toEqual(loginError(errorMessage))
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
        expect(await getAction(actions, AuthActionTypes.LOGIN_SUCCESSFULL)).toEqual(loginSuccessfull('Name'))
      })

      it('should dispatch loginError if the login was not successfull', async () => {
        memoDashLib.searchBlockchainUsers.mockReturnValue([{ name: 'Name' }])
        memoDashLib.login = jest.fn().mockImplementation(() => Promise.reject(new Error('LoginError')))

        const actions = await mockStoreAndDispatch(state, login('blockchainUsername'))
        expect(await getAction(actions, AuthActionTypes.LOGIN_ERROR)).toEqual(loginError('LoginError'))
      })
    })
  })
})
