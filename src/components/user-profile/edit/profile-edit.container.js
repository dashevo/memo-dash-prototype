import { withFormik } from 'formik'
import * as yup from 'yup'
import ProfileEditComponent from './profile-edit.component'

const mapPropsToValues = ({ profile: { username, bio } }) => ({
  username,
  bio
})

const validationSchema = yup.object().shape({
  bio: yup
    .string()
    .min(1)
    .max(144)
    .required('Text is required!')
})

const handleSubmit = ({ bio }, { props: { onSubmitted } }) => {
  onSubmitted(bio)
}

export default withFormik({
  mapPropsToValues,
  validationSchema,
  handleSubmit
})(ProfileEditComponent)
