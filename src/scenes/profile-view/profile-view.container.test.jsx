import React from 'react'
import configureStore from 'redux-mock-store'
import { shallow } from 'enzyme'
import ProfileViewContainer from './profile-view.container'
import { getAlice, getBob, testProfiles, testUsers } from "../../test-utils/test-data"

describe('<ProfileViewContainer />', () => {
  let store
  let ownProps

  let alice
  let bob

  const makeMockStore = (currentUser) =>
    configureStore()({
      user: {
        currentUser,
        users: testUsers,
        profiles: testProfiles
      }
    })

  const makeOwnProps = username => ({
    match: {
      params: {
        username
      }
    }
  })

  beforeEach(() => {
    const div = document.createElement('div')
    document.body.appendChild(div)

    alice = getAlice()
    bob = getBob()
  })

  describe('Shallow rendering', () => {
    it('renders without crashing', () => {
      ownProps = makeOwnProps(alice.uname)
      store = makeMockStore(alice.uname)
      const wrapper = shallow(<ProfileViewContainer {...ownProps} />, { context: { store } })
      expect(wrapper).toMatchSnapshot()
    })

    it('should render user profile that different from current user', () => {
      ownProps = makeOwnProps(bob.uname)
      store = makeMockStore(alice.uname)
      const wrapper = shallow(<ProfileViewContainer {...ownProps} />, { context: { store } })
      expect(wrapper).toMatchSnapshot()
    })
  })
})
