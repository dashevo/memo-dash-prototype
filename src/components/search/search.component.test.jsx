import React from 'react'
import { shallow } from 'enzyme'

import SearchComponent, { SEARCH_CATEGORIES } from './search.component'
import { testUsers, testMemos } from '../../test-utils/test-data'

describe('<SearchComponent />', () => {
  let wrapper
  let spies
  const alice = testUsers['alice']
  const source = {
    users: {
      name: SEARCH_CATEGORIES.USERS,
      results: [
        {
          category: SEARCH_CATEGORIES.MEMOS,
          childKey: alice.memoIds[0],
          image: alice.profile.avatarUrl,
          title: testMemos[alice.memoIds[0]].memoText
        },
        {
          category: SEARCH_CATEGORIES.USERS,
          childKey: alice.username,
          image: alice.profile.avatarUrl,
          title: alice.username,
          description: alice.profile.bio
        }
      ]
    }
  }

  beforeEach(() => {
    spies = {
      getAllUsers: jest.fn(),
      onGoToProfileClicked: jest.fn()
    }
    const div = document.createElement('div')
    document.body.appendChild(div)
  })

  describe('should render', () => {
    it('without crashing', () => {
      wrapper = shallow(<SearchComponent getAllUsers={spies.getAllUsers} />)
      expect(wrapper).toMatchSnapshot()
    })

    it('with results', () => {
      wrapper = shallow(<SearchComponent getAllUsers={spies.getAllUsers} />)
      wrapper.setState({
        results: source
      })
      expect(wrapper).toMatchSnapshot()
    })

    it('with value', () => {
      wrapper = shallow(<SearchComponent getAllUsers={spies.getAllUsers} />)
      wrapper.setState({
        value: 'test1'
      })
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('interaction', () => {
    beforeEach(() => {
      wrapper = shallow(
        <SearchComponent
          getAllUsers={spies.getAllUsers}
          onGoToProfileClicked={spies.onGoToProfileClickedSpy}
          source={source}
        />
      )
    })

    it('should change value', () => {
      wrapper.instance().handleSearchChange({}, { value: 'My new value' })
      expect(wrapper).toMatchSnapshot()
    })

    it('should find alice', () => {
      wrapper.instance().handleSearchChange({}, { value: 'al' })
      expect(wrapper).toMatchSnapshot()
    })

    it('should find memo', () => {
      wrapper.instance().handleSearchChange({}, { value: 'Suscipit vel nobis.' })
      expect(wrapper).toMatchSnapshot()
    })
  })
})
