import React from 'react'
import configureStore from 'redux-mock-store'
import { shallow } from 'enzyme'
import MemoContainer from './memo.container'
import testUsers from '../../test-utils/test-users'

describe('<MemoContainer />', () => {
  let store
  let testUser
  beforeEach(() => {
    testUser = testUsers['alice']
    // Mock store
    const mockStore = configureStore()
    store = mockStore({
      user: { currentUser: testUser.username, likedByMe: false, users: {} }
    })

    const div = document.createElement('div')
    document.body.appendChild(div)
  })

  describe('Shallow rendering', () => {
    it('renders without crashing', () => {
      const wrapper = shallow(<MemoContainer />, { context: { store } })
      expect(wrapper).toMatchSnapshot()
    })
  })
})
