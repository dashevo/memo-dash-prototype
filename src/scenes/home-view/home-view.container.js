import { connect } from 'react-redux'
import HomeViewComponent from './home-view.component'
import { getMemos as getMemosFromState } from '../../store/selectors'

const mapStateToProps = state => {
  return {
    memos: getMemosFromState(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllMemos: () => {
      dispatch(getAllMemos())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeViewComponent)
