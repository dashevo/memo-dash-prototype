import React, { Fragment, Component } from 'react'
import { Button, Modal } from 'semantic-ui-react'

export default class MemoDeleteComponent extends Component {
  state = {
    opened: false
  }

  show = e => {
    e.stopPropagation()
    this.setState({ opened: true })
  }
  close = e => {
    e.stopPropagation()
    this.setState({ opened: false })
  }
  delete = e => {
    e.stopPropagation()
    const { memo, onDeleteMemoClicked } = this.props
    onDeleteMemoClicked(memo)
    this.close(e)
  }

  render() {
    const { opened } = this.state

    return (
      <Fragment>
        <Button icon="trash" size="mini" floated="right" color="red" basic onClick={this.show} />
        {opened ? (
          <Modal size="mini" open={opened} onClose={e => this.close(e)}>
            <Modal.Header>Delete Memo</Modal.Header>
            <Modal.Content>
              <p>Are you sure you want to delete the memo</p>
            </Modal.Content>
            <Modal.Actions>
              <Button negative onClick={e => this.close(e)}>
                No
              </Button>
              <Button
                positive
                icon="checkmark"
                labelPosition="right"
                content="Yes"
                onClick={e => this.delete(e)}
              />
            </Modal.Actions>
          </Modal>
        ) : null}
      </Fragment>
    )
  }
}
