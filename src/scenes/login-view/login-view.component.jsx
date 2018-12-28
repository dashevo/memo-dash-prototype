import React, { Component } from 'react'
import { Button, Form, Grid, Header, Message, Segment, Menu, Container, Responsive } from 'semantic-ui-react'
import Logo from '../../components/logo/logo.component'
import './styles.css'

export default class LoginViewComponent extends Component {
  constructor() {
    super()

    this.state = {
      username: 'alice'
    }
  }

  onChangeUsername = (event, field) => {
    this.setState({
      username: field.value
    })
  }

  render() {
    return (
      <React.Fragment>
        <Menu fixed="top" color="blue" size="tiny" borderless stackable>
          <Container>
            <Menu.Item as="a" header>
              <Logo />
              <div className="active">MemoDash</div>
            </Menu.Item>
          </Container>
        </Menu>
        <div className="login-form">
          <Form
            size="large"
            onSubmit={async event => {
              this.props.onLoginClick(this.state.username)
            }}
          >
            <Segment>
              <Header as="h2" color="blue">
                <Responsive {...Responsive.onlyMobile}>Log-in</Responsive>
                <Responsive minWidth={Responsive.onlyTablet.minWidth}>Log-in to your account</Responsive>
              </Header>
              <Form.Input
                name="username"
                placeholder="Username"
                required
                value={this.state.username}
                onChange={this.onChangeUsername}
              />

              <br />
              <Button color="blue" size="large">
                Login
              </Button>
            </Segment>
          </Form>
          <Message negative hidden={!this.props.authError}>
            {this.props.authError}
          </Message>
        </div>
      </React.Fragment>
    )
  }
}
