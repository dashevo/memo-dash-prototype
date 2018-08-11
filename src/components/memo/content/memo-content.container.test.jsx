import React from 'react'
import configureStore from 'redux-mock-store'
import { shallow } from 'enzyme'
import MemoContentContainer from './memo-content.container'

import testUsers from '../../../test-utils/test-users'

describe('<MemoContentContainer />', () => {
  let store
  let testUser
  beforeEach(() => {
    testUser = testUsers['alice']
    // Mock store
    const mockStore = configureStore()
    store = mockStore({
      user: { currentUser: testUser.username }
    })

    const div = document.createElement('div')
    document.body.appendChild(div)
  })

  describe('Shallow rendering', () => {
    it('renders without crashing', () => {
      const wrapper = shallow(<MemoContentContainer />, { context: { store } })
      expect(wrapper).toMatchSnapshot()
    })
  })
})
