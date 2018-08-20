import React from 'react'
import configureStore from 'redux-mock-store'
import { shallow } from 'enzyme'
import MemoModalContainer from './memo-modal.container'
import { combineMemoId } from '../../../store/reducers/memo.reducer'

import { testUsers, testMemos } from '../../../test-utils/test-data'

describe('<MemoModalContainer />', () => {
  let store
  const alice = testUsers['alice']
  const memo = testMemos[alice.memoIds[0]]
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

        const wrapper = shallow(<MemoModalContainer memo={memo} />, { context: { store } })
        expect(wrapper).toMatchSnapshot()
      })

      it('opened modal', () => {
        const combinedMemoId = combineMemoId(memo.username, memo.idx)
        store = mockStore({
          memoModal: { opened: true, openedMemo: combinedMemoId },
          memo: { memos: { [combinedMemoId]: memo } }
        })

        const wrapper = shallow(<MemoModalContainer memo={memo} />, { context: { store } })
        expect(wrapper).toMatchSnapshot()
      })
    })
  })
})
