import React from 'react'
import MemoContainer from '../memo.container'
import { Comment, Modal, Segment } from 'semantic-ui-react'

import './memo-modal.styles.css'

const MemoModalComponent = props => {
  const { memo, opened, onModalCloseClicked } = props

  if (!opened) return null

  return (
    <Segment className="memo">
      <Comment.Group threaded>
        <Modal open={opened} onClose={onModalCloseClicked} closeIcon className="memo-modal" size="small">
          <Modal.Content scrolling>
            <Comment.Group>
              <MemoContainer showReplies={true} memo={memo} />
            </Comment.Group>
          </Modal.Content>
        </Modal>
      </Comment.Group>
    </Segment>
  )
}

export default MemoModalComponent
