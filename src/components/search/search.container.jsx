import { connect } from 'react-redux'

import SearchComponent, { SEARCH_CATEGORIES } from './search.component'
import { getAllUsers, openMemoModalByCombinedId } from '../../store/actions'
import { push } from 'connected-react-router'
import { getUsersForSearch, getMemosForSearch } from '../../store/selectors/search.selector'

const mapStateToProps = state => {
  return {
    source: {
      users: { name: SEARCH_CATEGORIES.USERS, results: getUsersForSearch(SEARCH_CATEGORIES.USERS)(state) },
      memos: {
        name: SEARCH_CATEGORIES.MEMOS,
        results: getMemosForSearch(SEARCH_CATEGORIES.MEMOS)(state)
      }
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllUsers: () => dispatch(getAllUsers()),
    onGoToProfileClicked: username => dispatch(push(`/profile/${username}`)),
    onOpenMemoClicked: memoId => dispatch(openMemoModalByCombinedId(memoId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchComponent)
