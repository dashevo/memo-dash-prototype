import React, { Component } from 'react'
import { Comment, Segment } from 'semantic-ui-react'
import MemoActionsContainer from './actions/memo-actions.container'
import MemoAvatarContainer from './avatar/memo-avatar.container'
import MemoContentContainer from './content/memo-content.container'
import './memo.styles.css'
import MemoContainer from './memo.container'

export default class MemoComponent extends Component {
  componentDidMount() {
    const { memo, showReplies, onLoadReplies } = this.props
    if (showReplies && memo.memoRepliesCount > 0) {
      onLoadReplies(memo)
    }
  }

  render() {
    const { memo, showReplies, showBorders, replies, openModalOnClick, onModalOpenClicked } = this.props

    return (
      <Segment
        basic={!showBorders}
        className="memo"
        onClick={!!openModalOnClick ? () => onModalOpenClicked(memo) : undefined}
      >
        <Comment>
          <MemoAvatarContainer memo={memo} />
          <Comment.Content>
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
      </Segment>
    )
  }
}
