import React, { Component } from 'react'
import { Comment, Segment } from 'semantic-ui-react'
import MemoActionsContainer from './actions/memo-actions.container'
import MemoAvatarContainer from './avatar/memo-avatar.container'
import MemoContentContainer from './content/memo-content.container'
import './memo.styles.css'
import MemoContainer from './memo.container'
import MemoDeleteContainer from './delete/memo-delete.container'

export default class MemoComponent extends Component {
  componentDidMount() {
    const { memo, showReplies, onLoadReplies } = this.props
    if (showReplies && memo.memoRepliesCount > 0) {
      onLoadReplies(memo)
    }
  }

  componentWillReceiveProps(nextProps) {
    const { memo, closeModal } = nextProps

    if (!memo) closeModal()
  }

  render() {
    const {
      memo,
      showReplies,
      showDelete,
      showBorders,
      replies,
      memoNotAvailable,
      openModalOnClick,
      onModalOpenClicked
    } = this.props

    return (
      <Segment
        basic={!showBorders}
        className="memo"
        onClick={!!openModalOnClick && !memoNotAvailable ? () => onModalOpenClicked(memo) : undefined}
      >
        {memoNotAvailable ? (
          <Comment>
            <Comment.Content>Liked memo is no longer available</Comment.Content>
          </Comment>
        ) : (
          <Comment>
            <MemoAvatarContainer memo={memo} />
            <Comment.Content>
              {showDelete ? <MemoDeleteContainer memo={memo} /> : null}
              <MemoContentContainer memo={memo} />
              <MemoActionsContainer memo={memo} />
            </Comment.Content>
            {showReplies &&
              !!replies && (
                <Comment.Group>
                  {replies.map(reply => (
                    <MemoContainer showReplies={true} memo={reply} key={reply.idx} />
                  ))}
                </Comment.Group>
              )}
          </Comment>
        )}
      </Segment>
    )
  }
}
