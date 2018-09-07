import React from 'react'
import { Button, Form } from 'semantic-ui-react'

const MemoFormComponent = props => {
  const { values, touched, errors, isSubmitting, handleBlur, handleSubmit, handleChange, buttonLabel } = props
  return (
    <Form reply onSubmit={handleSubmit}>
      <Form.TextArea
        autoFocus
        name="message"
        value={values.message}
        onChange={handleChange}
        onBlur={handleBlur}
        onClick={e => e.stopPropagation()}
        className={errors.message && touched.message ? ' error' : ''}
        disabled={isSubmitting}
      />
      <Button
        type="submit"
        content={buttonLabel}
        labelPosition="left"
        icon="edit"
        primary
        disabled={isSubmitting || !!errors.message || !values.message}
        onClick={e => e.stopPropagation()}
      />
    </Form>
  )
}

export default MemoFormComponent
