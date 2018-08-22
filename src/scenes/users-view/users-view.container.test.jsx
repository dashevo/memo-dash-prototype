import React from 'react'
import configureStore from 'redux-mock-store'
import { shallow } from 'enzyme'
import UsersViewContainer from './users-view.container'
import { testUsers } from '../../test-utils/test-data'

describe('<UsersViewContainer />', () => {
  let store
  const alice = testUsers['alice']

  beforeEach(() => {
    // Mock store
    const mockStore = configureStore()
    store = mockStore({
      user: {
        currentUser: alice.username,
        users: testUsers
      }
    })

    const div = document.createElement('div')
    document.body.appendChild(div)
  })

  describe('Shallow rendering', () => {
    it('renders without crashing', () => {
      const wrapper = shallow(<UsersViewContainer />, { context: { store } })
      expect(wrapper).toMatchSnapshot()
    })
  })
})
