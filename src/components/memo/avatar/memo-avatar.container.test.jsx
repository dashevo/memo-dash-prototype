import React from 'react'
import configureStore from 'redux-mock-store'
import { shallow } from 'enzyme'
import MemoAvatarContainer from './memo-avatar.container'

import { testUsers, testMemos } from '../../../test-utils/test-data'

describe('<MemoAvatarContainer />', () => {
  let store
  const alice = testUsers['alice']
  const ownMemo = testMemos[alice.memoIds[0]]

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
      const wrapper = shallow(<MemoAvatarContainer memo={ownMemo} />, { context: { store } })
      expect(wrapper).toMatchSnapshot()
    })

    it('foreign memo', () => {
      const bob = testUsers['bob']
      const foreignMemo = testMemos[bob.memoIds[0]]
      const wrapper = shallow(<MemoAvatarContainer memo={foreignMemo} />, { context: { store } })
      expect(wrapper).toMatchSnapshot()
    })
  })
})
