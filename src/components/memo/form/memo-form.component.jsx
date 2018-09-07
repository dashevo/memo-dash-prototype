import React from 'react'
import { Button, Form } from 'semantic-ui-react'

const MemoFormComponent = props => {
  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleBlur,
    handleSubmit,
    handleChange,
    onCanceled,
    buttonLabel
  } = props
  return (
    <Form reply onSubmit={handleSubmit} onClick={e => e.stopPropagation()}>
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
        size="mini"
        content={buttonLabel}
        labelPosition="left"
        icon="edit"
        primary
        disabled={isSubmitting || !!errors.message || !values.message}
      />
      <Button type="reset" size="mini" content="Cancel" onClick={onCanceled} />
    </Form>
  )
}

export default MemoFormComponent
