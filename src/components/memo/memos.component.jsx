import React from 'react'
import MemoContainer from './memo.container'
import { Comment, Segment } from 'semantic-ui-react'
import MemoModalContainer from './modal/memo-modal.container'

const MemosComponent = props => {
  const { memos } = props

  if(!memos){
    return null;
  }

  return (
    <Segment basic center>
      {memos ? (
        <Comment.Group>
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
    </Segment>
  )
}

export default MemosComponent
