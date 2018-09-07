import React, { Fragment } from 'react'
import { Card } from 'semantic-ui-react'

import ProfileOverviewContainer from './profile-overview.container'

const ProfileOverviewsComponent = props => {
  const { actualUsername, userProfiles, itemsPerRow } = props

  return (
    <Fragment>
      {userProfiles ? (
        <Card.Group itemsPerRow={itemsPerRow ? itemsPerRow : 3}>
          {Object.values(userProfiles).map(userProfile => (
            <ProfileOverviewContainer
              key={userProfile.username}
              actualUsername={actualUsername}
              userProfile={userProfile}
            />
          ))}
        </Card.Group>
      ) : (
        'No profiles available'
      )}
    </Fragment>
  )
}

export default ProfileOverviewsComponent
