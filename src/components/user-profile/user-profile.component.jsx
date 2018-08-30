import React from 'react'
import { Card, Image, Label, Button } from 'semantic-ui-react'

const UserProfileComponent = props => {
  const { userProfile } = props

  if (!userProfile) return null

  const {
    isProfileOfCurrentUser,
    onGoToProfileClicked,
    following,
    onFollowClicked,
    onUnFollowClicked
  } = props

  return (
    <Card link as="div" onClick={() => onGoToProfileClicked(userProfile.username)}>
      <Image fluid src={userProfile.avatarUrl} />
      <Card.Content>
        <Card.Header>
          {userProfile.username}
          {!isProfileOfCurrentUser ? (
            following ? (
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
            )
          ) : null}
        </Card.Header>
        <Card.Description>{userProfile.bio}</Card.Description>
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

export default UserProfileComponent
