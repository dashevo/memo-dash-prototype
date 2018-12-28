import React, { Component } from 'react'
import { Comment, Button, Icon } from 'semantic-ui-react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import MemoFormContainer from '../form/memo-form.container'

dayjs.extend(relativeTime)

class MemoComponent extends Component {
  state = {
    replyingToMemo: false,
    modalOpened: false,
    editing: false
  }

  goToProfile = e => {
    e.stopPropagation()
    const { memo, onGoToProfileClicked } = this.props
    onGoToProfileClicked(memo.username)
  }

  edit = e => {
    e.stopPropagation()
    this.setState({ editing: true })
  }

  onEditSubmitted = (username, memoId, message) => {
    this.props.onEditClicked(username, memoId, message)
    this.setState({ editing: false })
  }

  onEditCanceled = () => {
    this.setState({ editing: false })
  }

  render() {
    const { memo, showEdit } = this.props
    const { editing } = this.state

    if (!memo) return null

    return (
      <Comment.Content>
        {showEdit ? (
          <Button
            as="div"
            className="edit-button"
            labelPosition="right"
            size="mini"
            floated="right"
            onClick={this.edit}
          >
            <Button basic>
              <Icon name="pencil" />
              Edit
            </Button>
          </Button>
        ) : null}
        <Comment.Author as="a" onClick={this.goToProfile}>
          {memo.username}
        </Comment.Author>
        <Comment.Metadata>
          <span>posted {dayjs(memo.memoDatetime).from()}</span>
        </Comment.Metadata>
        {editing ? (
          <MemoFormContainer
            memoId={memo.idx}
            username={memo.username}
            buttonLabel="Update Memo"
            message={memo.memoText}
            onSubmitted={this.onEditSubmitted}
            onCanceled={this.onEditCanceled}
          />
        ) : (
          <Comment.Text>{memo.memoText}</Comment.Text>
        )}
      </Comment.Content>
    )
  }
}

export default MemoComponent
