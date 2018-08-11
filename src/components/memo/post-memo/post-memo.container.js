import { connect } from 'react-redux'

import { withFormik } from 'formik'
import * as yup from 'yup'

import { postMemo } from '../../../store/actions'
import PostMemoComponent from './post-memo.component'

const mapPropsToValues = () => ({
  message: ''
})

const validationSchema = yup.object().shape({
  message: yup.string().required('Text is required!')
})

const handleSubmit = async ({ message }, { props, resetForm }) => {
  props.onMemoSubmitted(message)
  resetForm()
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return { onMemoSubmitted: message => dispatch(postMemo(message)) }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    mapPropsToValues,
    validationSchema,
    handleSubmit
  })(PostMemoComponent)
)

/* export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddMemoComponent) */
