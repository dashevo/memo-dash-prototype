import React from 'react'
import configureStore from 'redux-mock-store'
import { shallow } from 'enzyme'
import ProfileViewContainer from './profile-view.container'

describe('<ProfileViewContainer />', () => {
  let store

  beforeEach(() => {
    // Mock store
    const mockStore = configureStore()
    store = mockStore({
      user: {
        currentUser: {
          profile: {
            avatarUrl: 'AvatarUrl',
            username: 'Username',
            bio: 'Bio',
            followersCount: 1,
            followingCount: 1
          }
        }
      }
    })

    const div = document.createElement('div')
    document.body.appendChild(div)
  })

  describe('Shallow rendering', () => {
    it('renders without crashing', () => {
      const wrapper = shallow(<ProfileViewContainer />, { context: { store } })
      expect(wrapper).toMatchSnapshot()
    })
  })
})
