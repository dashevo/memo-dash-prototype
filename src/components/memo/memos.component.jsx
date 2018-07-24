import React, { Component, Fragment } from 'react'
import MemoContainer from './memo.container'
import { Comment } from 'semantic-ui-react'

export default class MemosComponent extends Component {
  render() {
    const { memos } = this.props
    return (
      <Fragment>
        {memos ? (
          <Comment.Group size="large">
            {memos.map(memo => <MemoContainer key={memo.idx + memo.username} memo={memo} />)}
          </Comment.Group>
        ) : (
          'No memos available'
        )}
      </Fragment>
    )
  }
}
