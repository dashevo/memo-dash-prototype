import { connect } from "react-redux"

import MemoDeleteComponent from "./memo-delete.component"
import { deleteMemo } from "../../../store/actions"

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    onDeleteMemoClicked: memo => {
      dispatch(deleteMemo(memo.$scopeId))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MemoDeleteComponent)
