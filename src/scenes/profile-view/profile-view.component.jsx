import React, { Component } from 'react'
import { Container, Image, Grid, Menu, Segment, Header } from 'semantic-ui-react'
import MemosContainer from '../../components/memo/memos.container'

export class ProfileViewComponent extends Component {
  componentDidMount() {
    this.props.getOwnMemos()
  }

  render() {
    const { profile, memos } = this.props

    return (
      <React.Fragment>
        <Container style={{ marginTop: '7em' }}>
          <Grid>
            <Grid.Row>
              <Grid.Column width={4}>
                <Image src={profile.avatarUrl} size="medium" circular />
                <Header as="h1">{profile.username}</Header>
                <Segment>{profile.bio}</Segment>
              </Grid.Column>
              <Grid.Column width={12}>
                <Menu>
                  <Menu.Item active as="a">
                    Memos ({memos ? memos.length : 0})
                  </Menu.Item>
                  <Menu.Item as="a">Followers ({profile.followersCount})</Menu.Item>
                  <Menu.Item as="a">Following ({profile.followingCount})</Menu.Item>
                </Menu>
                <Container>
                  <MemosContainer memos={memos} />
                </Container>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </React.Fragment>
    )
  }
}

export default ProfileViewComponent
