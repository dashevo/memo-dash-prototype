import ReplyFormComponent from './reply-form.component'
import { withFormik } from 'formik'
import * as yup from 'yup'

const mapPropsToValues = ({ username, memoId }) => ({
  message: '',
  username,
  memoId
})

const validationSchema = yup.object().shape({
  message: yup.string().required('Text is required!')
})

const handleSubmit = ({ username, memoId, message }, { setSubmitting, props: { onReplyClicked } }) => {
  onReplyClicked(username, memoId, message)
}

export default withFormik({
  mapPropsToValues,
  validationSchema,
  handleSubmit
})(ReplyFormComponent)
