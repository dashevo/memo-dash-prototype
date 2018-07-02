import React from 'react'
import configureStore from 'redux-mock-store'
import { shallow } from 'enzyme'
import MemosContainer from './memos.container'

describe('<MemosContainer />', () => {
  let store

  beforeEach(() => {
    // Mock store
    const mockStore = configureStore()
    store = mockStore({
      user: { currentUser: { memos: ['memo'] } }
    })

    const div = document.createElement('div')
    document.body.appendChild(div)
  })

  describe('Shallow rendering', () => {
    it('renders without crashing', () => {
      const wrapper = shallow(<MemosContainer />, { context: { store } })
      expect(wrapper).toMatchSnapshot()
    })
  })
})
