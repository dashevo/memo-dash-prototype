import React, { Component, Fragment } from 'react'
import { Comment, Icon } from 'semantic-ui-react'
import MemoFormContainer from '../form/memo-form.container'
import DashIcon from '../../icons/DashIcon'

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

  onReplySubmitted = (username, memoId, message) => {
    this.props.onReplyClicked(username, memoId, message)
    this.setState({ replyingToMemo: false })
  }

  onReplyCanceled = () => {
    this.setState({ replyingToMemo: false })
  }

  render() {
    const { memo, likedByCurrentUser, isMemoOfCurrentUser } = this.props

    if (!memo) return null

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
            <Icon name="like" color={likedByCurrentUser ? 'red' : ''} />
            <span>{memo.memoLikesCount}</span>
          </Comment.Action>
          <Comment.Action name="tipAction" onClick={e => e.stopPropagation()}>
            {/* <Icon name="btc" /> */}
            <DashIcon color="white" backgroundColor="gray" />
            <span>{memo.memoTipTotal}</span>
          </Comment.Action>
        </Comment.Actions>
        {replyingToMemo ? (
          <MemoFormContainer
            memoId={memo.idx}
            username={memo.username}
            onSubmitted={this.onReplySubmitted}
            onCanceled={this.onReplyCanceled}
            buttonLabel="Add Reply"
          />
        ) : (
          ''
        )}
      </Fragment>
    )
  }
}

export default MemoComponent
