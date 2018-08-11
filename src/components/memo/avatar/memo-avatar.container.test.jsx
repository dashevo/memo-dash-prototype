import React from 'react'
import configureStore from 'redux-mock-store'
import { shallow } from 'enzyme'
import MemoAvatarContainer from './memo-avatar.container'

import testUsers from '../../../test-utils/test-users'

describe('<MemoAvatarContainer />', () => {
  let store
  const alice = testUsers['alice']
  const bob = testUsers['bob']

  beforeEach(() => {
    // Mock store
    const mockStore = configureStore()

    store = mockStore({
      user: { currentUser: alice.username, users: {} }
    })

    const div = document.createElement('div')
    document.body.appendChild(div)
  })

  describe('Shallow rendering', () => {
    it('renders without crashing', () => {
      const wrapper = shallow(<MemoAvatarContainer memo={alice.memos[0]} />, { context: { store } })
      expect(wrapper).toMatchSnapshot()
    })

    it('foreign memo', () => {
      const wrapper = shallow(<MemoAvatarContainer memo={bob.memos[0]} />, { context: { store } })
      expect(wrapper).toMatchSnapshot()
    })
  })
})
