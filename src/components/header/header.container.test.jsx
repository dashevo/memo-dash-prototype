import React from 'react'
import configureStore from 'redux-mock-store'
import { shallow } from 'enzyme'
import HeaderContainer from './header.container'

describe('<HeaderContainer />', () => {
  let store

  beforeEach(() => {
    // Mock store
    const mockStore = configureStore()
    store = mockStore({
      router: { location: { pathname: '/' } }
    })

    const div = document.createElement('div')
    document.body.appendChild(div)
  })

  describe('Shallow rendering', () => {
    it('renders without crashing', () => {
      const wrapper = shallow(<HeaderContainer />, { context: { store } })
      expect(wrapper).toMatchSnapshot()
    })
  })
})
