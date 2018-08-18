import React, { Fragment } from 'react'
import { Card } from 'semantic-ui-react'

import UserProfileContainer from './user-profile.container'

const UserProfilesComponent = props => {
  const { actualUsername, userProfiles } = props

  return (
    <Fragment>
      {userProfiles ? (
        <Card.Group itemsPerRow={3}>
          {Object.values(userProfiles).map(userProfile => (
            <UserProfileContainer
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

export default UserProfilesComponent
