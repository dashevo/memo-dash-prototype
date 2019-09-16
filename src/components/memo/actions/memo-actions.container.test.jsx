import React from 'react'
import configureStore from 'redux-mock-store'
import { shallow } from 'enzyme'
import MemoActionsContainer from './memo-actions.container'

import { testUsers, testMemos, getAlice, getAliceMemos, getBobMemos } from "../../../test-utils/test-data"

describe('<MemoActionsContainer />', () => {
  let store
  let alice

  beforeEach(() => {
    alice = getAlice()

    // Mock store
    const mockStore = configureStore()
    store = mockStore({
      user: { currentUser: alice.uname }
    })

    const div = document.createElement('div')
    document.body.appendChild(div)
  })

  describe('Shallow rendering', () => {
    it('renders without crashing', () => {
      const wrapper = shallow(<MemoActionsContainer memo={getAliceMemos()[0]} />, { context: { store } })
      expect(wrapper).toMatchSnapshot()
    })

    it('foreign memo', () => {
      const wrapper = shallow(<MemoActionsContainer memo={getBobMemos()[0]} />, { context: { store } })
      expect(wrapper).toMatchSnapshot()
    })
  })
})
