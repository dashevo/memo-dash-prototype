import React from 'react'
import { Button, Segment, Form } from 'semantic-ui-react'

import './post-memo.styles.css'

const PostMemoComponent = props => {
  const { values, touched, errors, isSubmitting, handleBlur, handleSubmit, handleChange } = props

  return (
    <Segment color="blue" className="post-memo">
      <Form onSubmit={handleSubmit}>
        <Form.TextArea
          autoHeight
          placeholder="Your Message"
          style={{ minHeight: 20 }}
          name="message"
          value={values.message}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.message && touched.message ? ' error' : ''}
          disabled={isSubmitting}
        />
        <Button
          type="submit"
          content="Post Memo"
          labelPosition="left"
          icon="edit"
          primary
          disabled={isSubmitting || !!errors.message || !values.message}
        />
      </Form>
    </Segment>
  )
}

export default PostMemoComponent
