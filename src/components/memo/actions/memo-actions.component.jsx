import React, { Component, Fragment } from 'react'
import { Comment, Icon } from 'semantic-ui-react'
import ReplyFormContainer from '../reply/reply-form.container'

class MemoComponent extends Component {
  constructor(props) {
    super(props)
    this.state = { replyingToMemo: false, modalOpened: false }
  }

  reply = e => {
    e.stopPropagation()
    this.setState({ replyingToMemo: true })
  }

  likeMemo = e => {
    e.stopPropagation()

    const {
      likedByCurrentUser,
      isMemoOfCurrentUser,
      memo,
      onRemoveLikeClicked,
      onLikeMemoClicked
    } = this.props
    if (!isMemoOfCurrentUser) {
      if (likedByCurrentUser) onRemoveLikeClicked(memo.username, memo.idx)
      else onLikeMemoClicked(memo.username, memo.idx)
    }
  }

  openModal = e => {
    this.setState({ modalOpened: true })
  }

  onReplySubmitted = (username, memo, message) => {
    this.props.onReplyClicked(username, memo, message)
    this.setState({ replyingToMemo: false })
  }

  render() {
    const { memo, likedByCurrentUser, isMemoOfCurrentUser } = this.props
    const { replyingToMemo } = this.state

    return (
      <Fragment>
        <Comment.Actions>
          {isMemoOfCurrentUser ? (
            <Comment.Action as="span" name="replyAction">
              <Icon name="reply" />
              <span>{memo.memoRepliesCount}</span>
            </Comment.Action>
          ) : (
            <Comment.Action as="a" name="replyAction" onClick={this.reply}>
              <Icon name="reply" />
              <span>{memo.memoRepliesCount}</span>
            </Comment.Action>
          )}
          <Comment.Action name="likeAction" as={!isMemoOfCurrentUser ? 'a' : 'span'} onClick={this.likeMemo}>
            <Icon name="like" color={likedByCurrentUser ? 'red' : 'grey'} />
            <span>{memo.memoLikesCount}</span>
          </Comment.Action>
          <Comment.Action name="tipAction">
            <Icon name="btc" color="grey" />
            <span>{memo.memoTipTotal}</span>
          </Comment.Action>
        </Comment.Actions>
        {replyingToMemo ? (
          <ReplyFormContainer
            memoId={memo.idx}
            username={memo.username}
            onReplySubmitted={this.onReplySubmitted}
          />
        ) : (
          ''
        )}
      </Fragment>
    )
  }
}

export default MemoComponent
