import React, { Component, Fragment } from 'react'
import { Tab, Container } from 'semantic-ui-react'
import MemosContainer from '../../memo/memos.container'
import ProfileOverviewsComponent from '../overview/profile-overviews.component'
import MemosComponent from '../../memo/memos.component'

const TABS = {
  MEMOS: 0,
  FOLLOWERS: 1,
  FOLLOWING: 2,
  LIKED_MEMOS: 3
}

const PATHS = {
  MEMOS: 'memos',
  FOLLOWERS: 'followers',
  FOLLOWING: 'following',
  LIKED_MEMOS: 'likedMemos'
}

const mapPathnameToTab = pathname => {
  switch (pathname) {
    case PATHS.MEMOS:
      return TABS.MEMOS
    case PATHS.FOLLOWERS:
      return TABS.FOLLOWERS
    case PATHS.FOLLOWING:
      return TABS.FOLLOWING
    case PATHS.LIKED_MEMOS:
      return TABS.LIKED_MEMOS
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
          userProfiles={following.map(user => user.profile)}
        />
      ) : (
        <Fragment>You do not follow anyone</Fragment>
      )}
    </Tab.Pane>
  )

  renderLikedMemos = likedMemos => {
    return (
      <Tab.Pane>
        {likedMemos && Object.values(likedMemos).length > 0 ? (
          <MemosComponent memos={likedMemos} />
        ) : (
          <Fragment>You have not liked anyone yet</Fragment>
        )}
      </Tab.Pane>
    )
  }

  onTabChange = (event, data) => {
    const {
      memos,
      followers,
      following,
      likedMemos,
      username,
      onMemosClicked,
      onFollowersClicked,
      onFollowingClicked,
      onLikedMemosClicked
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
      case TABS.LIKED_MEMOS:
        onLikedMemosClicked(likedMemos, username)
        break
      default:
        break
    }
  }

  render() {
    const { profile, memos, followers, following, likedMemos, pathname } = this.props

    return (
      <Fragment>
        {profile ? (
          <Tab
            menu={{ secondary: true, pointing: true }}
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
              },
              {
                active: pathname === PATHS.LIKED_MEMOS,
                menuItem: `Likes (${profile.likesCount})`,
                render: () => this.renderLikedMemos(likedMemos)
              }
            ]}
          />
        ) : null}
      </Fragment>
    )
  }
}

export default ProfileContentComponent
