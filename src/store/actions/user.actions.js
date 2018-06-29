const UserActionTypes = {
  USER_PROFILE_RECEIVED: 'USER_PROFILE_RECEIVED'
}

const getUserProfile = () => async (dispatch, getState) => {
  const {
    root: { memoDashLib }
  } = getState()

  const userProfile = await memoDashLib.getUserProfile()

  dispatch(userProfileReceived(userProfile))
}

const userProfileReceived = userProfile => ({
  type: UserActionTypes.USER_PROFILE_RECEIVED,
  payload: userProfile
})

export { UserActionTypes, getUserProfile, userProfileReceived }
