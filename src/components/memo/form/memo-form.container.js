import { withFormik } from 'formik'
import * as yup from 'yup'
import MemoFormComponent from './memo-form.component'

const mapPropsToValues = ({ username, memoId }) => ({
  message: '',
  username,
  memoId
})

const validationSchema = yup.object().shape({
  message: yup.string().required('Text is required!')
})

const handleSubmit = ({ username, memoId, message }, { setSubmitting, props: { onSubmitted } }) => {
  onSubmitted(username, memoId, message)
}

export default withFormik({
  mapPropsToValues,
  validationSchema,
  handleSubmit
})(MemoFormComponent)
