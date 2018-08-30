import React, { Component } from 'react'
import { Dimmer, Loader, Container, Image, Grid, Segment, Header, Tab } from 'semantic-ui-react'
import MemosContainer from '../../components/memo/memos.container'
import UserProfilesComponent from '../../components/user-profile/user-profiles.component'
import FollowButtonContainer from '../../components/follow/follow-button.container'

const TABS = {
  MEMOS: 0,
  FOLLOWERS: 1,
  FOLLOWING: 2
}

const PATHS = {
  MEMOS: 'memos',
  FOLLOWERS: 'followers',
  FOLLOWING: 'following'
}

const mapPathnameToTab = pathname => {
  switch (pathname) {
    case PATHS.MEMOS:
      return TABS.MEMOS
    case PATHS.FOLLOWERS:
      return TABS.FOLLOWERS
    case PATHS.FOLLOWING:
      return TABS.FOLLOWING
    default:
      return TABS.MEMOS
  }
}

export class ProfileViewComponent extends Component {
  componentDidMount() {
    const { username, pathname, profile } = this.props

    if (!profile) this.props.getUser(username)
    this.onTabChange(undefined, { activeIndex: mapPathnameToTab(pathname) })
  }

  componentDidUpdate(prevProps) {
    const { username, pathname } = this.props
    const { username: prevUsername } = prevProps

    if (username !== prevUsername) {
      this.onTabChange(undefined, { activeIndex: mapPathnameToTab(pathname) })
    }
  }

  onTabChange = (event, data) => {
    const {
      memos,
      followers,
      following,
      username,
      onMemosClicked,
      onFollowersClicked,
      onFollowingClicked
    } = this.props

    switch (data.activeIndex) {
      case TABS.MEMOS:
        onMemosClicked(memos, username)
        break
      case TABS.FOLLOWERS:
        onFollowersClicked(followers, username)
        break
      case TABS.FOLLOWING:
        onFollowingClicked(following, username)
        break
      default:
        break
    }
  }

  renderMemos = memos => (
    <Tab.Pane loading={!memos}>
      <Container>
        <MemosContainer memos={memos} />
      </Container>
    </Tab.Pane>
  )

  renderFollowers = followers => (
    <Tab.Pane loading={!followers}>
      {followers ? (
        <UserProfilesComponent
          actualUsername={this.props.username}
          userProfiles={followers.map(user => user.profile)}
        />
      ) : null}
    </Tab.Pane>
  )

  renderFollowing = following => (
    <Tab.Pane loading={!following}>
      {following ? (
        <UserProfilesComponent
          actualUsername={this.props.username}
          userProfiles={following.map(user => user.profile)}
        />
      ) : null}
    </Tab.Pane>
  )

  render() {
    const { profile, memos, followers, following, pathname } = this.props

    return (
      <React.Fragment>
        {!profile ? (
          <Dimmer active inverted>
            <Loader size="small">Loading</Loader>
          </Dimmer>
        ) : (
          <Container style={{ marginTop: '7em' }}>
            <Grid>
              <Grid.Row>
                <Grid.Column width={4}>
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
                </Grid.Column>
                <Grid.Column width={12}>
                  <Tab
                    onTabChange={this.onTabChange}
                    panes={[
                      {
                        active: pathname === PATHS.MEMOS,
                        menuItem: `Memos${memos ? ` (${memos.length})` : ''}`,
                        render: () => this.renderMemos(memos)
                      },
                      {
                        active: pathname === PATHS.FOLLOWERS,
                        menuItem: `Followers (${profile.followersCount})`,
                        render: () => this.renderFollowers(followers)
                      },
                      {
                        active: pathname === PATHS.FOLLOWING,
                        menuItem: `Following (${profile.followingCount})`,
                        render: () => this.renderFollowing(following)
                      }
                    ]}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        )}
      </React.Fragment>
    )
  }
}

export default ProfileViewComponent
