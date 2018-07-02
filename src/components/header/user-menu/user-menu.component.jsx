import React from 'react'
import { Dropdown, Image } from 'semantic-ui-react'

const trigger = (username, avatarUrl) => (
  <span>
    <Image src={avatarUrl} size="mini" spaced="right" circular />Hello, {username}
  </span>
)

const UserMenuComponent = props => (
  <Dropdown item simple trigger={trigger(props.username, props.avatar)}>
    <Dropdown.Menu>
      <Dropdown.Item onClick={props.onProfileClicked} active={props.location === '/profile'}>
        Your Profile
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item onClick={props.onSignOutClicked}>Sign Out</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
)

export default UserMenuComponent
