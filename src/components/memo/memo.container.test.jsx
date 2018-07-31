import React from 'react'
import configureStore from 'redux-mock-store'
import { shallow } from 'enzyme'
import MemoContainer from './memo.container'
import { filterUser } from '../../lib/helpers'

jest.mock('../../lib/helpers')

describe('<MemoContainer />', () => {
  let store
  let testUser
  beforeEach(() => {
    testUser = filterUser('alice')
    // Mock store
    const mockStore = configureStore()
    store = mockStore({
      user: { currentUser: testUser.username, likedByMe: false }
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
