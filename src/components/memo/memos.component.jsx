import React, { Fragment } from 'react'
import MemoContainer from './memo.container'
import { Comment } from 'semantic-ui-react'

const MemosComponent = props => {
  const { memos } = props
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

export default MemosComponent
