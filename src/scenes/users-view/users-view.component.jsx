import React, { Component } from 'react'
import ProfileOverviewsComponent from '../../components/user-profile/overview/profile-overviews.component'
import { Container } from 'semantic-ui-react'

export class UsersViewComponent extends Component {
  componentDidMount() {
    this.props.getAllUsers()
  }

  render() {
    const { users, currentUser } = this.props

    if (!users) return null

    const userProfilesWithoutMe = Object.values(users)
      .filter(user => user.username !== currentUser)
      .map(user => user.profile)

    return (
      <Container style={{ marginTop: '7em' }}>
        <ProfileOverviewsComponent itemsPerRow={4} userProfiles={userProfilesWithoutMe} />
      </Container>
    )
  }
}

export default UsersViewComponent
