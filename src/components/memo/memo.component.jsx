import React, { Component } from 'react'
import { Comment } from 'semantic-ui-react'
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
    const { memo, showReplies, replies, openModalOnClick, onModalOpenClicked } = this.props
    return (
      <Comment onClick={!!openModalOnClick ? () => onModalOpenClicked(memo) : undefined}>
        <MemoAvatarContainer memo={memo} />
        <Comment.Content>
          <MemoContentContainer memo={memo} />
          <MemoActionsContainer memo={memo} />
        </Comment.Content>
        {showReplies &&
          !!replies && (
            <Comment.Group>
              {replies.map(reply => <MemoContainer showReplies={true} memo={reply} key={reply.idx} />)}
            </Comment.Group>
          )}
      </Comment>
    )
  }
}
