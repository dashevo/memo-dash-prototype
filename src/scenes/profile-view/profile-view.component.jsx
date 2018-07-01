import React from 'react'
import { Container, Image, Grid, Menu, Segment, Header } from 'semantic-ui-react'

const ProfileViewComponent = props => {
  return (
    <React.Fragment>
      <Container style={{ marginTop: '7em' }}>
        <Grid>
          <Grid.Row>
            <Grid.Column width={4}>
              <Image src={props.profile.avatarUrl} size="medium" circular />
              <Header as="h1">{props.profile.username}</Header>
              <Segment>{props.profile.bio}</Segment>
            </Grid.Column>
            <Grid.Column width={12}>
              <Menu>
                <Menu.Item>Followers {props.profile.followersCount}</Menu.Item>
                <Menu.Item>Following {props.profile.followingCount}</Menu.Item>
              </Menu>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </React.Fragment>
  )
}

export default ProfileViewComponent
