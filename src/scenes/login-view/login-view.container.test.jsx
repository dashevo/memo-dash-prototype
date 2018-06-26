import React from 'react'
import configureStore from 'redux-mock-store'
import { shallow } from 'enzyme'
import LoginViewContainer from './login-view.container'

describe('<LoginViewContainer />', () => {
  let store

  beforeEach(() => {
    // Mock store
    const mockStore = configureStore()
    store = mockStore({
      user: { loginError: 'LoginError' },
      router: {}
    })

    const div = document.createElement('div')
    document.body.appendChild(div)
  })

  describe('Shallow rendering', () => {
    it('renders without crashing', () => {
      const wrapper = shallow(<LoginViewContainer />, { context: { store } })
      expect(wrapper).toMatchSnapshot()
    })
  })
})
