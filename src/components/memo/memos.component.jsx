import React, { Component, Fragment } from 'react'
import MemoComponent from './memo.component'
import { Comment } from 'semantic-ui-react'

export default class MemosComponent extends Component {
  render() {
    const { memos } = this.props
    return (
      <Fragment>
        {memos ? (
          <Comment.Group size="large">
            {memos.map(memo => <MemoComponent key={memo.idx + memo.username} memo={memo} />)}
          </Comment.Group>
        ) : (
          'No memos available'
        )}
      </Fragment>
    )
  }
}
