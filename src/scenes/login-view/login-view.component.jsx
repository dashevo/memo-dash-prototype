import React, { Component } from 'react'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
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
      <div className="login-form">
        <Grid textAlign="center" className="login-form-grid" verticalAlign="middle">
          <Grid.Column style={{ maxWidth: 450 }}>
            <Grid>
              <Grid.Row columns={2}>
                <Grid.Column width={4} textAlign="right" verticalAlign="middle">
                  <Logo />
                </Grid.Column>
                <Grid.Column width={12} textAlign="left" verticalAlign="middle">
                  <Header as="h2" color="blue">
                    Log-in to your account
                  </Header>
                </Grid.Column>
              </Grid.Row>
            </Grid>

            <Form
              size="large"
              onSubmit={async event => {
                this.props.onLoginClick(this.state.username)
              }}
            >
              <Segment stacked>
                <Form.Input
                  fluid
                  name="username"
                  icon="user"
                  iconPosition="left"
                  placeholder="Username"
                  required
                  value={this.state.username}
                  onChange={this.onChangeUsername}
                />
                {/* <Form.Input fluid icon="lock" iconPosition="left" placeholder="Password" type="password" /> */}

                <Button color="blue" fluid size="large">
                  Login
                </Button>
              </Segment>
            </Form>
            <Message negative hidden={!this.props.authError}>
              {this.props.authError}
            </Message>
            {/* <Message>
              New to us? <a href="#">Sign Up</a>
            </Message> */}
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}
