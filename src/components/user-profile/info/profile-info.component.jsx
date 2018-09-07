import React, { Component, Fragment } from 'react'
import { Image, Segment, Grid, Header } from 'semantic-ui-react'
import FollowButtonContainer from '../../follow/follow-button.container'

class ProfileInfoComponent extends Component {
  render() {
    const { profile } = this.props

    return (
      <Fragment>
        <Image src={profile.avatarUrl} size="medium" circular />
        <Segment>
          <Grid stackable columns={2}>
            <Grid.Column>
              <Header as="h1">{profile.username}</Header>
            </Grid.Column>
            <Grid.Column>
              <FollowButtonContainer userProfile={profile} />
            </Grid.Column>
          </Grid>
        </Segment>

        <Segment>{profile.bio}</Segment>
      </Fragment>
    )
  }
}

export default ProfileInfoComponent
