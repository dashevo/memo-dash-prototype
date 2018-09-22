import React, { Component } from 'react'
import { Form, Label } from 'semantic-ui-react'
import './textarea-with-char-counter.styles.css'

export default class TextAreaWithCharCounter extends Component {
  render() {
    const { value, maxLength } = this.props

    return (
      <div className="text-area-with-char-counter">
        {maxLength ? (
          <Label attached="bottom right">
            {value ? value.length : 0}/{maxLength}
          </Label>
        ) : null}
        <Form.TextArea {...this.props} />
      </div>
    )
  }
}
