import React from 'react'
import { Menu, Container } from 'semantic-ui-react'
import Logo from '../logo/logo.component'
import UserMenuContainer from './user-menu/user-menu.container'

const HeaderComponent = props => {
  const { onHomeClicked, onUsersClicked } = props

  return (
    <header>
      <Menu fixed="top" color="blue">
        <Container>
          <Menu.Item as="a" onClick={onHomeClicked} header>
            <Logo />
            MemoDash
          </Menu.Item>
          <Menu.Item as="a" onClick={onHomeClicked} active={props.location === '/home'}>
            Home
          </Menu.Item>
          <Menu.Item as="a" onClick={onUsersClicked} active={props.location === '/users'}>
            Users
          </Menu.Item>
          <Menu.Menu position="right">
            <UserMenuContainer />
          </Menu.Menu>
        </Container>
      </Menu>
    </header>
  )
}

export default HeaderComponent
