import React from 'react'
import configureStore from 'redux-mock-store'
import { shallow } from 'enzyme'
import UserMenuContainer from './user-menu.container'

jest.mock('../../../lib/helpers')

describe('<UserMenuContainer />', () => {
  let store

  beforeEach(() => {
    // Mock store
    const mockStore = configureStore()
    store = mockStore({
      user: {
        currentUser: 'alice',
        users: []
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
