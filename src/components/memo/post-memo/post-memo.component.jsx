import React from 'react'
import { Button, Segment, Form } from 'semantic-ui-react'

import './post-memo.styles.css'
import TextAreaWithCharCounter from '../../common/textarea-with-char-counter/textarea-with-char-counter.component'

const PostMemoComponent = props => {
  const { values, touched, errors, isSubmitting, handleBlur, handleSubmit, handleChange } = props

  return (
    <Segment className="post-memo">
      <Form onSubmit={handleSubmit}>
        <div>
          <TextAreaWithCharCounter
            key="message"
            autoHeight
            placeholder="Your Message"
            style={{ minHeight: 20, height: '100%' }}
            maxLength={144}
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
            primary
            disabled={isSubmitting || !!errors.message || !values.message}
          />
        </div>
      </Form>
    </Segment>
  )
}

export default PostMemoComponent
