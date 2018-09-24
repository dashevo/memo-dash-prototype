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
          {Object.keys(memos)
            .sort((a, b) => a.memoDatetime < b.memoDatetime)
            .map(memoId => (
              <MemoContainer
                key={memoId}
                showBorders={true}
                openModalOnClick={true}
                showReplies={false}
                memo={memos[memoId]}
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
