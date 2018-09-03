import React from 'react'
import configureStore from 'redux-mock-store'
import { shallow } from 'enzyme'
import MemoDeleteContainer from './memo-delete.container'
import { combineMemoId } from '../../../store/reducers/memo.reducer'

import { testUsers, testMemos } from '../../../test-utils/test-data'

describe('<MemoDeleteContainer />', () => {
  let store
  const alice = testUsers['alice']
  const memo = testMemos[alice.memoIds[0]]

  beforeEach(() => {
    const mockStore = configureStore()
    store = mockStore()

    const div = document.createElement('div')
    document.body.appendChild(div)
  })

  describe('Shallow rendering', () => {
    describe('should render', () => {
      it('without crashing', () => {
        const wrapper = shallow(<MemoDeleteContainer memo={memo} />, { context: { store } })
        expect(wrapper).toMatchSnapshot()
      })
    })
  })
})
