import React from 'react'
import { Comment, Icon, Segment } from 'semantic-ui-react'

import './memo.styles.css'

const MemoComponent = props => {
  const { memo, onGoToProfileClicked } = props
  return (
    <Segment>
      <Comment>
        <Comment.Avatar
          as="a"
          className="avatar"
          src={memo.avatarUrl}
          onClick={() => onGoToProfileClicked(memo.username)}
        />
        <Comment.Content>
          <Comment.Author as="a" onClick={() => props.onGoToProfileClicked(memo.username)}>
            {memo.username}
          </Comment.Author>
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
