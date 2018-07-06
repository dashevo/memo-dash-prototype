import React from 'react'
import { Comment, Icon, Segment } from 'semantic-ui-react'

const MemoComponent = props => {
  const { memo } = props
  return (
    <Segment>
      <Comment>
        <Comment.Avatar as="a" src={memo.avatarUrl} />
        <Comment.Content>
          <Comment.Author as="a">{memo.username}</Comment.Author>
          <Comment.Metadata>
            <span>{memo.memoDatetime}</span>
          </Comment.Metadata>
          <Comment.Text>{memo.memoText}</Comment.Text>
          <Comment.Actions>
            <a>
              <Icon name="reply" />
              <span>{memo.memoRepliesCount}</span>
            </a>
            <a>
              <Icon name="like" />
              <span>{memo.memoLikesCount}</span>
            </a>
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
