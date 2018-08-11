import React from 'react'
import configureStore from 'redux-mock-store'
import { shallow } from 'enzyme'
import PrivateRouteContainer from './private-route.container'
import { initialState } from '../../store/reducers/user.reducer'

describe('<PrivateRouteContainer />', () => {
  let store

  beforeEach(() => {
    // Mock store
    const mockStore = configureStore()
    store = mockStore({
      user: initialState,
      router: {}
    })

    const div = document.createElement('div')
    document.body.appendChild(div)
  })

  describe('Shallow rendering', () => {
    it('renders without crashing', () => {
      const wrapper = shallow(<PrivateRouteContainer />, { context: { store } })
      expect(wrapper).toMatchSnapshot()
    })
  })
})
