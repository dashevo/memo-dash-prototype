import React, { Fragment } from 'react'
import MemoContainer from './memo.container'
import { Comment, Segment } from 'semantic-ui-react'
import MemoModalContainer from './modal/memo-modal.container'

const MemosComponent = props => {
  const { memos } = props
  return (
    <Fragment>
      {memos ? (
        <Comment.Group size="large">
          {Object.values(memos)
            .sort((a, b) => a.memoDatetime < b.memoDatetime)
            .map(memo => (
              <Segment className="memo" key={memo.idx + memo.username}>
                <MemoContainer openModalOnClick={true} showReplies={false} memo={memo} />
              </Segment>
            ))}
          <MemoModalContainer />
        </Comment.Group>
      ) : (
        'No memos available'
      )}
    </Fragment>
  )
}

export default MemosComponent
