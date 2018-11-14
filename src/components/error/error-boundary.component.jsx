import React, { Component } from 'react'
import { Container, Grid } from 'semantic-ui-react'

class ErrorBoundaryComponent extends Component {
  state = {
    hasError: false
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true })
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container>
          <Grid centered columns={2}>
            <Grid.Row>
              <Grid.Column style={{ textAlign: 'center' }}>
                <h1 style={{ marginTop: 100, marginBottom: 100 }}>Oops, something went wrong.</h1>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundaryComponent
