import React from 'react'
import { Menu, Container, Popup, Icon, Responsive, Button } from 'semantic-ui-react'
import Logo from '../logo/logo.component'
import UserMenuContainer from './user-menu/user-menu.container'
import SearchContainer from '../search/search.container'

const HeaderComponent = props => {
  const { onHomeClicked, onUsersClicked } = props

  return (
    // <header>
    <Menu fixed="top" color="blue" size="tiny">
      <Container>
        <Menu.Item as="a" onClick={onHomeClicked} header>
          <Logo />
          <div className="active">MemoDash</div>
        </Menu.Item>
        <Menu.Item as="a" onClick={onHomeClicked} active={props.location === '/home'}>
          Home
        </Menu.Item>
        <Menu.Item as="a" onClick={onUsersClicked} active={props.location === '/users'}>
          Users
        </Menu.Item>

        <Menu.Menu position="right">
          <Menu.Item>
            <SearchContainer />
          </Menu.Item>
          <UserMenuContainer position="right" />
          <Popup
            trigger={
              <Menu.Item as="a" onClick={props.resetVMN}>
                <Icon name="erase" color="black" />
              </Menu.Item>
            }
            content="Reset VMN"
            position="bottom left"
          />
          <Popup
            trigger={
              <Menu.Item as="a" href="/block-explorer.html" target="_blank">
                <Icon name="block layout" color="black" />
              </Menu.Item>
            }
            content="Block Explorer"
            position="bottom left"
          />
        </Menu.Menu>
      </Container>
    </Menu>
    // </header>
  )
}

export default HeaderComponent
