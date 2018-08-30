import React from 'react'
import { Button } from 'semantic-ui-react'

const FollowButtonComponent = props => {
  const { isProfileOfCurrentUser } = props

  if (isProfileOfCurrentUser) return null

  const { userProfile, following, onFollowClicked, onUnFollowClicked } = props

  return (
    <React.Fragment>
      {following ? (
        <Button
          animated="fade"
          color="blue"
          floated="right"
          size="mini"
          onClick={e => onUnFollowClicked(e, userProfile.username)}
        >
          <Button.Content visible>Following</Button.Content>
          <Button.Content hidden>Unfollow</Button.Content>
        </Button>
      ) : (
        <Button
          basic
          color="blue"
          floated="right"
          size="mini"
          onClick={e => onFollowClicked(e, userProfile.username)}
        >
          Follow
        </Button>
      )}
    </React.Fragment>
  )
}

export default FollowButtonComponent
