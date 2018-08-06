import React from 'react'
import configureStore from 'redux-mock-store'
import { shallow } from 'enzyme'
import UserMenuContainer from './user-menu.container'
import testUsers from '../../../test-utils/test-users'

describe('<UserMenuContainer />', () => {
  let store

  beforeEach(() => {
    const testUser = testUsers['alice']
    // Mock store
    const mockStore = configureStore()
    store = mockStore({
      user: {
        currentUser: testUser.username,
        users: { [testUser.username]: testUser }
      },
      router: { location: { pathname: '/' } }
    })

    const div = document.createElement('div')
    document.body.appendChild(div)
  })

  describe('Shallow rendering', () => {
    it('renders without crashing', () => {
      const wrapper = shallow(<UserMenuContainer />, { context: { store } })
      expect(wrapper).toMatchSnapshot()
    })
  })
})
