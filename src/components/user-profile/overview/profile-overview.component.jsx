import React from 'react'
import { Card, Image, Label } from 'semantic-ui-react'
import FollowButtonContainer from '../../follow/follow-button.container'

const ProfileOverviewComponent = props => {
  const { username, userProfile } = props

  if (!username || !userProfile) return null

  const { onGoToProfileClicked } = props

  return (
    <Card link as="div" onClick={() => onGoToProfileClicked(userProfile.username)}>
      <Image fluid src={userProfile.avatarUrl} />
      <Card.Content>
        <Card.Header>
          {username}
          <FollowButtonContainer userProfile={userProfile} />
        </Card.Header>
        <Card.Description>{userProfile.text}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Label>
          Followers
          <Label.Detail>{userProfile.followersCount}</Label.Detail>
        </Label>
        <Label>
          Following
          <Label.Detail>{userProfile.followingCount}</Label.Detail>
        </Label>
      </Card.Content>
    </Card>
  )
}

export default ProfileOverviewComponent
