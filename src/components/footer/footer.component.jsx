import React from 'react'
import { Segment, List } from 'semantic-ui-react'

const FooterComponent = props => {
  return (
    <footer
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0
      }}
    >
      <Segment size="mini" floated="left">
        <List horizontal divided link>
          <List.Item as="a" onClick={props.resetVMN}>
            Reset VMN
          </List.Item>
          <List.Item as="a" href="/block-explorer.html" target="_blank">
            Block Explorer
          </List.Item>
        </List>
      </Segment>
    </footer>
  )
}

export default FooterComponent
