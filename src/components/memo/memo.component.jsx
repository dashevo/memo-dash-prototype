import React from 'react'
import { Comment, Icon, Segment } from 'semantic-ui-react'

import './memo.styles.css'

const MemoComponent = props => {
  const { currentUser, likedByMe, memo, onGoToProfileClicked, onRemoveLikeClicked, onLikeMemoClicked } = props

  return (
    <Segment className="memo">
      <Comment>
        {currentUser === memo.username ? (
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
            <Comment.Action>
              <Icon name="reply" />
              <span>{memo.memoRepliesCount}</span>
            </Comment.Action>
            <Comment.Action
              as={currentUser !== memo.username ? 'a' : 'span'}
              onClick={
                currentUser !== memo.username
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
            <span>
              <Icon name="btc" color="grey" />
              <span>{memo.memoTipTotal}</span>
            </span>
          </Comment.Actions>
        </Comment.Content>
      </Comment>
    </Segment>
  )
}

export default MemoComponent
