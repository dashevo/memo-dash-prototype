import React, { Component } from 'react'
import { Dimmer, Loader, Container, Grid } from 'semantic-ui-react'
import ProfileInfoComponent from '../../components/user-profile/info/profile-info.component'
import ProfileContentContainer from '../../components/user-profile/content/profile-content.container'
import ProfileEditContainer from '../../components/user-profile/edit/profile-edit.container'

export class ProfileViewComponent extends Component {
  state = {
    editing: false
  }

  componentDidMount() {
    const { username, profile } = this.props
    if (!profile) this.props.getUser(username)
  }

  onEdit = () => {
    this.setState({ editing: true })
  }

  onEditSubmitted = text => {
    this.props.onEditSubmitted(text)
    this.setState({ editing: false })
  }

  onEditCanceled = () => {
    this.setState({ editing: false })
  }

  render() {
    const { username, profile, isProfileOfCurrentUser } = this.props
    const { editing } = this.state

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
                  {editing ? (
                    <ProfileEditContainer
                      username={username}
                      profile={profile}
                      onSubmitted={this.onEditSubmitted}
                      onCanceled={this.onEditCanceled}
                    />
                  ) : (
                    <ProfileInfoComponent
                      username={username}
                      profile={profile}
                      ownProfile={isProfileOfCurrentUser}
                      onEditClicked={this.onEdit}
                    />
                  )}
                </Grid.Column>
                <Grid.Column width={12}>
                  <ProfileContentContainer profile={profile} />
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
