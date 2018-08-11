import React, { Component } from 'react'
import { Comment } from 'semantic-ui-react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

class MemoComponent extends Component {
  constructor(props) {
    super(props)
    this.state = { replyingToMemo: false, modalOpened: false }
  }

  goToProfile = e => {
    const { memo, onGoToProfileClicked } = this.props
    onGoToProfileClicked(memo.username)
  }

  render() {
    const { memo } = this.props

    // 2018-08-11T14:55:53.205Z
    //.format('{YYYY} MM-DDTHH:mm:ss SSS [Z] A')

    return (
      <Comment.Content>
        <Comment.Author as="a" onClick={this.goToProfile}>
          {memo.username}
        </Comment.Author>
        <Comment.Metadata>
          <span>{dayjs(memo.memoDatetime).from()}</span>
        </Comment.Metadata>
        <Comment.Text>{memo.memoText}</Comment.Text>
      </Comment.Content>
    )
  }
}

export default MemoComponent
