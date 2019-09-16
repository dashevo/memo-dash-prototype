import React from 'react'
import configureStore from 'redux-mock-store'
import { shallow } from 'enzyme'
import ProfileContentContainer from './profile-content.container'
import { testUsers, testMemos, getAlice, testProfiles } from "../../../test-utils/test-data"

describe('<ProfileContentContainer />', () => {
  let store
  let alice
  let aliceProfile

  beforeEach(() => {

    alice = getAlice()
    aliceProfile = testProfiles[alice.uname]
    // Mock store
    const mockStore = configureStore()

    store = mockStore({
      user: { currentUser: alice.uname, users: { [alice.uname]: alice } },
      memo: { memos: testMemos },
      router: {
        location: {
          pathname: `/profile/${alice.uname}/memos`
        }
      }
    })

    const div = document.createElement('div')
    document.body.appendChild(div)
  })

  describe('Shallow rendering', () => {
    it('renders without crashing', () => {
      const wrapper = shallow(<ProfileContentContainer username={alice.uname} profile={aliceProfile} />, {
        context: { store }
      })
      expect(wrapper).toMatchSnapshot()
    })
  })
})
