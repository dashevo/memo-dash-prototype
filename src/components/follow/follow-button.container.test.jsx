import React from 'react'
import configureStore from 'redux-mock-store'
import { shallow } from 'enzyme'
import FollowButtonContainer from './follow-button.container'
import { testUsers } from '../../test-utils/test-data'

describe('<FollowButtonContainer />', () => {
  let store
  const alice = testUsers['alice']

  beforeEach(() => {
    // Mock store
    const mockStore = configureStore()

    store = mockStore({
      user: { currentUser: alice.username, users: { [alice.username]: alice } }
    })

    const div = document.createElement('div')
    document.body.appendChild(div)
  })

  describe('Shallow rendering', () => {
    it('renders without crashing', () => {
      const wrapper = shallow(<FollowButtonContainer userProfile={alice.profile} />, { context: { store } })
      expect(wrapper).toMatchSnapshot()
    })
  })
})
