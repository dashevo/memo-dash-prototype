import reducer, { initialState, combineMemoId } from './user-profile.reducer'
import { userProfilesReceived } from '../actions/user-profile.actions'
import testUsers from '../../test-utils/test-users'

describe('user profile reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  describe('not relevant actions', () => {
    it('should return unchanged state', () => {
      const state = {}
      expect(reducer(state, {})).toBe(state)
    })
  })

  describe('relevant actions', () => {
    describe('User profiles', () => {
      let alice = testUsers['alice']
      let bob = testUsers['bob']
      let userProfiles

      beforeEach(() => {
        userProfiles = [alice.profile, bob.profile]
      })

      describe('should handle USER_PROFILES_RECEIVED', () => {
        it('should add received user profiles to the state', () => {
          expect(reducer(undefined, userProfilesReceived(userProfiles))).toEqual({
            ...initialState,
            userProfiles: {
              [alice.username]: alice.profile,
              [bob.username]: bob.profile
            }
          })
        })

        it('should return original state when received undefined', () => {
          expect(reducer(undefined, userProfilesReceived(undefined))).toEqual(initialState)
        })
      })
    })
  })
})
