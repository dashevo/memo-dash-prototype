import { withFormik } from "formik"
import * as yup from "yup"
import ProfileEditComponent from "./profile-edit.component"

const mapPropsToValues = ({ username, profile: { text } }) => ({
  username,
  text
})

const validationSchema = yup.object().shape({
  text: yup
    .string()
    .min(1)
    .max(144)
    .required("Text is required!")
})

const handleSubmit = ({ text }, { props: { onSubmitted } }) => {
  onSubmitted(text)
}

export default withFormik({
  mapPropsToValues,
  validationSchema,
  handleSubmit
})(ProfileEditComponent)
