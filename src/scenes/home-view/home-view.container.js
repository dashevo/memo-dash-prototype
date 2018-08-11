import { connect } from 'react-redux'
import HomeViewComponent from './home-view.component'
import { getMemos } from '../../store/actions'
import { getMemos as getMemosFromState } from '../../store/selectors'

const mapStateToProps = state => {
  return {
    memos: getMemosFromState(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getMemos: () => {
      dispatch(getMemos())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeViewComponent)
