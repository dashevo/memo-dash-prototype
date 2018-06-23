import React from 'react'
import configureStore from 'redux-mock-store'
import { shallow } from 'enzyme'
import App from './app'

describe('App', () => {
  let store

  beforeEach(() => {
    // Mock store
    const mockStore = configureStore()
    store = mockStore({
      router: {}
    })

    const div = document.createElement('div')
    document.body.appendChild(div)
  })

  describe('Shallow rendering', () => {
    it('renders without crashing', () => {
      const wrapper = shallow(<App />, { context: { store } })
      expect(wrapper).toMatchSnapshot()
    })
  })
})
