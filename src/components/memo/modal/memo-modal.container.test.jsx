import React from 'react'
import configureStore from 'redux-mock-store'
import { shallow } from 'enzyme'
import MemoModalContainer from './memo-modal.container'
import { combineMemoId } from '../../../store/reducers/memo.reducer'

import testUsers from '../../../test-utils/test-users'

describe('<MemoModalContainer />', () => {
  let store
  const alice = testUsers['alice']
  const bob = testUsers['bob']
  let mockStore

  beforeEach(() => {
    mockStore = configureStore()

    const div = document.createElement('div')
    document.body.appendChild(div)
  })

  describe('Shallow rendering', () => {
    describe('should render', () => {
      it('without crashing', () => {
        store = mockStore({
          memoModal: { opened: false },
          memo: { memos: [] }
        })

        const wrapper = shallow(<MemoModalContainer memo={alice.memos[0]} />, { context: { store } })
        expect(wrapper).toMatchSnapshot()
      })

      it('opened modal', () => {
        const memo = alice.memos[0]
        const combinedMemoId = combineMemoId(memo.username, memo.idx)
        store = mockStore({
          memoModal: { opened: true, openedMemo: combinedMemoId },
          memo: { memos: { [combinedMemoId]: memo } }
        })

        const wrapper = shallow(<MemoModalContainer memo={alice.memos[0]} />, { context: { store } })
        expect(wrapper).toMatchSnapshot()
      })
    })
  })
})
