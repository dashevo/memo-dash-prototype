import React from 'react'
import configureStore from 'redux-mock-store'
import { shallow } from 'enzyme'
import HomeViewContainer from './home-view.container'

describe('<HomeViewContainer />', () => {
  let store

  beforeEach(() => {
    // Mock store
    const mockStore = configureStore()
    store = mockStore({
      user: { currentUser: { username: 'Username' } }
    })

    const div = document.createElement('div')
    document.body.appendChild(div)
  })

  describe('Shallow rendering', () => {
    it('renders without crashing', () => {
      const wrapper = shallow(<HomeViewContainer />, { context: { store } })
      expect(wrapper).toMatchSnapshot()
    })
  })
})
