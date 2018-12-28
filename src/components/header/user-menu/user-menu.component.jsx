import React from 'react'
import { Dropdown, Image } from 'semantic-ui-react'
import './user-menu.component.styles.css'

const trigger = (username, avatarUrl) => (
  <span>
    <Image src={avatarUrl} size="mini" spaced="right" className="user-menu-avatar" />
    {username}
  </span>
)

const UserMenuComponent = props => (
  <Dropdown item simple trigger={trigger(props.username, props.avatarUrl)}>
    <Dropdown.Menu>
      <Dropdown.Item
        onClick={() => props.onProfileClicked(props.username)}
        active={props.location === '/profile'}
      >
        Your Profile
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item onClick={props.onSignOutClicked}>Sign Out</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
)

export default UserMenuComponent
