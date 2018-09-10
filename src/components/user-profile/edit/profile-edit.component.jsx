import React from 'react'
import { Image, Form, Button, Card } from 'semantic-ui-react'
import FollowButtonContainer from '../../follow/follow-button.container'

const ProfileEditComponent = props => {
  const { profile, values, errors, handleBlur, handleSubmit, handleChange, onCanceled } = props

  return (
    <Form onSubmit={handleSubmit}>
      <Card>
        <Image src={profile.avatarUrl} size="medium" />
        <Card.Content>
          <Card.Header>
            {profile.username}
            <FollowButtonContainer userProfile={profile} />
          </Card.Header>
          <Card.Description>
            <Form.TextArea
              name="bio"
              autoHeight
              value={values.bio}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Card.Description>
        </Card.Content>
        <Card.Content extra textAlign="right">
          <Button type="submit" size="mini" content="Update" primary disabled={!!errors.bio} />
          <Button type="reset" size="mini" content="Cancel" onClick={onCanceled} />
        </Card.Content>
      </Card>
    </Form>
  )
}

export default ProfileEditComponent
