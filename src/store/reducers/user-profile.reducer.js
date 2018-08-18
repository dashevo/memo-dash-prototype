import { UserProfileActionTypes } from '../actions/user-profile.actions'

export const initialState = {
  userProfiles: undefined
}

export default (state = initialState, action) => {
  switch (action.type) {
    case UserProfileActionTypes.USER_PROFILE_RECEIVED:
      const userProfiles = { ...state.userProfiles }
      const receivedUserProfiles = action.payload

      if (receivedUserProfiles) {
        receivedUserProfiles.forEach(
          receivedUserProfile => (userProfiles[receivedUserProfile.username] = receivedUserProfile)
        )

        return {
          ...state,
          userProfiles
        }
      }
      return state
    default:
      return state
  }
}
