import React, { Fragment } from 'react'
import MemoContainer from './memo.container'
import { Comment } from 'semantic-ui-react'
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
              <MemoContainer
                key={memo.idx + memo.username}
                showBorders={true}
                openModalOnClick={true}
                showReplies={false}
                memo={memo}
              />
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
