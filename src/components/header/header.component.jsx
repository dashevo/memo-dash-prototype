import React, { Component } from 'react'
import { Menu, Container } from 'semantic-ui-react'
import Logo from '../logo'
import UserMenuContainer from './user-menu/user-menu.container'

const HeaderComponent = props => {
  return (
    <Menu fixed="top" color="blue">
      <Container>
        <Menu.Item as="a" header>
          <Logo />
          MemoDash
        </Menu.Item>
        <Menu.Item as="a" onClick={props.onHomeClicked} active={props.location === '/home'}>
          Home
        </Menu.Item>

        <Menu.Menu position="right">
          <UserMenuContainer />
        </Menu.Menu>
      </Container>
    </Menu>
  )
}

export default HeaderComponent
