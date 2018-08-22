import React from 'react'
import configureStore from 'redux-mock-store'
import { shallow } from 'enzyme'
import MemoActionsContainer from './memo-actions.container'

import { testUsers, testMemos } from '../../../test-utils/test-data'

describe('<MemoActionsContainer />', () => {
  let store
  const alice = testUsers['alice']

  beforeEach(() => {
    // Mock store
    const mockStore = configureStore()

    store = mockStore({
      user: { currentUser: alice.username }
    })

    const div = document.createElement('div')
    document.body.appendChild(div)
  })

  describe('Shallow rendering', () => {
    it('renders without crashing', () => {
      const wrapper = shallow(<MemoActionsContainer memo={testMemos['[alice][1]']} />, { context: { store } })
      expect(wrapper).toMatchSnapshot()
    })

    it('foreign memo', () => {
      const wrapper = shallow(<MemoActionsContainer memo={testMemos['[bob][1]']} />, { context: { store } })
      expect(wrapper).toMatchSnapshot()
    })
  })
})
