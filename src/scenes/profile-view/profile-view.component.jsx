import React, { Component } from 'react'
import { Dimmer, Loader, Container, Grid } from 'semantic-ui-react'
import ProfileInfoComponent from '../../components/user-profile/info/profile-info.component'
import ProfileContentContainer from '../../components/user-profile/content/profile-content.container'

export class ProfileViewComponent extends Component {
  componentDidMount() {
    const { username, profile } = this.props
    if (!profile) this.props.getUser(username)
  }

  render() {
    const { profile } = this.props

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
                  <ProfileInfoComponent profile={profile} />
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
