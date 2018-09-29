import React from 'react'
import configureStore from 'redux-mock-store'
import { shallow } from 'enzyme'
import SearchContainer from './search.container'
import { testUsers, testMemos } from '../../test-utils/test-data'

describe('<SearchContainer />', () => {
  let store
  const alice = testUsers['alice']

  beforeEach(() => {
    // Mock store
    const mockStore = configureStore()

    store = mockStore({
      user: { users: { [alice.username]: alice } },
      memo: { memos: testMemos }
    })

    const div = document.createElement('div')
    document.body.appendChild(div)
  })

  describe('Shallow rendering', () => {
    it('renders without crashing', () => {
      const wrapper = shallow(<SearchContainer />, {
        context: { store }
      })
      expect(wrapper).toMatchSnapshot()
    })
    it('renders without crashing if no data is available', () => {
      const wrapper = shallow(<SearchContainer />, {
        context: { store: configureStore()({ user: { users: {} }, memo: { memos: {} } }) }
      })
      expect(wrapper).toMatchSnapshot()
    })
  })
})
