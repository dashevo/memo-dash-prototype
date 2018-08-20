import React from 'react'
import configureStore from 'redux-mock-store'
import { shallow } from 'enzyme'
import ProfileViewContainer from './profile-view.container'
import { testUsers } from '../../test-utils/test-data'

describe('<ProfileViewContainer />', () => {
  let store
  let ownProps

  const alice = testUsers['alice']
  const bob = testUsers['bob']

  const makeMockStore = (currentUser, profileOfUser) =>
    configureStore()({
      user: {
        currentUser,
        users: {
          [alice.username]: alice,
          [bob.username]: bob
        }
      },
      router: {
        location: {
          pathname: `/profile/${profileOfUser}/memos`
        }
      },
      memo: { memos: {} }
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
  })

  describe('Shallow rendering', () => {
    it('renders without crashing', () => {
      ownProps = makeOwnProps(alice.username)
      store = makeMockStore(alice.username, alice.username)
      const wrapper = shallow(<ProfileViewContainer {...ownProps} />, { context: { store } })
      expect(wrapper).toMatchSnapshot()
    })

    it('should render user prfoile that different from current user', () => {
      ownProps = makeOwnProps(bob.username)
      store = makeMockStore(alice.username, bob.username)
      const wrapper = shallow(<ProfileViewContainer {...ownProps} />, { context: { store } })
      expect(wrapper).toMatchSnapshot()
    })
  })
})
