import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import './styles.css'
import MemosContainer from '../../components/memo/memos.container'

export class HomeViewComponent extends Component {
  componentDidMount() {
    this.props.getMemos()
  }

  render() {
    return (
      <React.Fragment>
        <Container text style={{ marginTop: '7em' }}>
          <MemosContainer memos={this.props.memos} />
        </Container>
      </React.Fragment>
    )
  }
}

export default HomeViewComponent
