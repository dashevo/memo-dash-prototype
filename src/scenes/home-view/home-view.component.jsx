import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import './styles.css'

export class HomeViewComponent extends Component {
  componentDidMount() {
    this.props.getAllMemos()
  }

  render() {
  return (
    <React.Fragment>
      <Container text style={{ marginTop: '7em' }}>
        Home
      </Container>
    </React.Fragment>
  )
}
}

export default HomeViewComponent
