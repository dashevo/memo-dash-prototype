import { connect } from 'react-redux'
import HomeViewComponent from './home-view.component'
import { getAllMemos } from '../../store/actions'

const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser,
    memos: state.user.memos
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
