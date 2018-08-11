import React from 'react'
import { shallow } from 'enzyme'
import configureStore from 'redux-mock-store'

import PostMemoContainer from './post-memo.container'
import { Form } from 'semantic-ui-react'

describe('<PostMemoContainer />', () => {
  let store
  beforeEach(() => {
    const mockStore = configureStore()
    store = mockStore({})
  })

  describe('Shallow rendering', () => {
    it('renders without crashing', () => {
      const wrapper = shallow(<PostMemoContainer />, { context: { store } })
      expect(wrapper).toMatchSnapshot()
    })
  })
})
