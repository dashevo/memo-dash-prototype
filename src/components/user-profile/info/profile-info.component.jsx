import React from 'react'
import { Image, Button, Card } from 'semantic-ui-react'
import FollowButtonContainer from '../../follow/follow-button.container'

const ProfileInfoComponent = props => {
  const { profile, ownProfile, onEditClicked } = props

  return (
    <Card>
      <Image src={profile.avatarUrl} size="medium" />
      <Card.Content>
        <Card.Header>
          {profile.username}
          {ownProfile ? (
            <Button icon="edit" size="mini" floated="right" basic onClick={onEditClicked} />
          ) : (
            <FollowButtonContainer userProfile={profile} />
          )}
        </Card.Header>
        <Card.Description>{profile.bio}</Card.Description>
      </Card.Content>
    </Card>
  )
}

export default ProfileInfoComponent
