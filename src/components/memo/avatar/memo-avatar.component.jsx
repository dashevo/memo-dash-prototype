import React, { Fragment } from 'react'
import { Comment } from 'semantic-ui-react'

const MemoAvatarComponent = props => {
  const { isMemoOfCurrentUser, memo, avatarUrl, onGoToProfileClicked } = props

  return (
    <Fragment>
      {isMemoOfCurrentUser ? (
        <Comment.Avatar className="avatar" src={avatarUrl} />
      ) : (
        <Comment.Avatar as="a" src={avatarUrl} onClick={() => onGoToProfileClicked(memo.username)} />
      )}
    </Fragment>
  )
}

export default MemoAvatarComponent
