import React, { Component } from 'react'
import { Comment, Icon, Segment } from 'semantic-ui-react'

import './memo.styles.css'
import ReplyFormContainer from './reply/reply-form.container'

const isMemoOfCurrentUser = (currentUser, memo) => currentUser === memo.username

class MemoComponent extends Component {
  constructor(props) {
    super(props)
    this.state = { replyingToMemo: false }
  }

  onReplyClicked = (username, memo, message) => {
    this.props.onReplyClicked(username, memo, message)
    this.setState({ replyingToMemo: false })
  }

  render() {
    const {
      currentUser,
      likedByMe,
      memo,
      onGoToProfileClicked,
      onRemoveLikeClicked,
      onLikeMemoClicked
    } = this.props

    const { replyingToMemo } = this.state

    return (
      <Segment className="memo">
        <Comment>
          {isMemoOfCurrentUser(currentUser, memo) ? (
            <Comment.Avatar className="avatar" src={memo.avatarUrl} />
          ) : (
            <Comment.Avatar as="a" src={memo.avatarUrl} onClick={() => onGoToProfileClicked(memo.username)} />
          )}
          <Comment.Content>
            <Comment.Author as="a" onClick={() => onGoToProfileClicked(memo.username)}>
              {memo.username}
            </Comment.Author>
            <Comment.Metadata>
              <span>{memo.memoDatetime}</span>
            </Comment.Metadata>
            <Comment.Text>{memo.memoText}</Comment.Text>
            <Comment.Actions>
              {isMemoOfCurrentUser(currentUser, memo) ? (
                <Comment.Action as="span" name="replyAction">
                  <Icon name="reply" />
                  <span>{memo.memoRepliesCount}</span>
                </Comment.Action>
              ) : (
                <Comment.Action
                  as="a"
                  name="replyAction"
                  onClick={() => this.setState({ replyingToMemo: true })}
                >
                  <Icon name="reply" />
                  <span>{memo.memoRepliesCount}</span>
                </Comment.Action>
              )}
              <Comment.Action
                name="likeAction"
                as={!isMemoOfCurrentUser(currentUser, memo) ? 'a' : 'span'}
                onClick={
                  !isMemoOfCurrentUser(currentUser, memo)
                    ? () =>
                        likedByMe
                          ? onRemoveLikeClicked(memo.username, memo.idx)
                          : onLikeMemoClicked(memo.username, memo.idx)
                    : undefined
                }
              >
                <Icon name="like" color={likedByMe ? 'red' : 'grey'} />
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
                onReplyClicked={this.onReplyClicked}
              />
            ) : (
              ''
            )}
          </Comment.Content>
        </Comment>
      </Segment>
    )
  }
}

export default MemoComponent
