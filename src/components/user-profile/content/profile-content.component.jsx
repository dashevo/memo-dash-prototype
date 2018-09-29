import React, { Component, Fragment } from 'react'
import { Tab, Container } from 'semantic-ui-react'
import MemosContainer from '../../memo/memos.container'
import ProfileOverviewsComponent from '../overview/profile-overviews.component'

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

class ProfileContentComponent extends Component {
  componentDidMount() {
    const { pathname } = this.props
    this.onTabChange(undefined, { activeIndex: mapPathnameToTab(pathname) })
  }

  componentDidUpdate(prevProps) {
    const { username, pathname } = this.props
    const { username: prevUsername } = prevProps

    if (username !== prevUsername) {
      this.onTabChange(undefined, { activeIndex: mapPathnameToTab(pathname) })
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
      {followers && followers.length > 0 ? (
        <ProfileOverviewsComponent
          actualUsername={this.props.username}
          userProfiles={followers.map(user => user.profile)}
        />
      ) : (
        <Fragment>You have no followers</Fragment>
      )}
    </Tab.Pane>
  )

  renderFollowing = following => (
    <Tab.Pane>
      {following && following.length > 0 ? (
        <ProfileOverviewsComponent
          actualUsername={this.props.username}
          userProfiles={following.map(user => user.profile)}
        />
      ) : (
        <Fragment>You do not follow anyone</Fragment>
      )}
    </Tab.Pane>
  )

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

  render() {
    const { profile, memos, followers, following, pathname } = this.props
    return (
      <Fragment>
        {profile ? (
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
        ) : null}
      </Fragment>
    )
  }
}

export default ProfileContentComponent
