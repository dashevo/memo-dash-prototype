import React from 'react'
import configureStore from 'redux-mock-store'
import { shallow } from 'enzyme'
import ProfileContentContainer from './profile-content.container'
import { testUsers, testMemos } from '../../../test-utils/test-data'

describe('<ProfileContentContainer />', () => {
  let store
  const alice = testUsers['alice']

  beforeEach(() => {
    // Mock store
    const mockStore = configureStore()

    store = mockStore({
      user: { currentUser: alice.username, users: { [alice.username]: alice } },
      memo: { memos: testMemos },
      router: {
        location: {
          pathname: `/profile/${alice.username}/memos`
        }
      }
    })

    const div = document.createElement('div')
    document.body.appendChild(div)
  })

  describe('Shallow rendering', () => {
    it('renders without crashing', () => {
      const wrapper = shallow(<ProfileContentContainer profile={alice.profile} />, {
        context: { store }
      })
      expect(wrapper).toMatchSnapshot()
    })
  })
})
