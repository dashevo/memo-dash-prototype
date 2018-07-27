import React from 'react'
import configureStore from 'redux-mock-store'
import { shallow } from 'enzyme'
import ProfileViewContainer from './profile-view.container'

describe('<ProfileViewContainer />', () => {
  let store
  let ownProps

  beforeEach(() => {
    // Mock store
    const mockStore = configureStore()
    store = mockStore({
      user: {
        currentUser: 'User1',
        users: [
          {
            username: 'User1',
            profile: {
              avatarUrl: 'AvatarUrl',
              username: 'Username',
              bio: 'Bio',
              followersCount: 1,
              followingCount: 1
            },
            memos: [{ message: 'message', createdAt: 'createdAt' }]
          }
        ]
      }
    })

    ownProps = { match: { params: { username: 'username' } } }

    const div = document.createElement('div')
    document.body.appendChild(div)
  })

  describe('Shallow rendering', () => {
    it('renders without crashing', () => {
      const wrapper = shallow(<ProfileViewContainer {...ownProps} />, { context: { store } })
      expect(wrapper).toMatchSnapshot()
    })
  })
})
