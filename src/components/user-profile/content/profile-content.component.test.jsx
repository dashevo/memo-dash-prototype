import React from 'react'
import { shallow } from 'enzyme'
import { Card } from 'semantic-ui-react'

import { testUsers } from '../../../test-utils/test-data'
import ProfileContentComponent from './profile-content.component'

describe('<ProfileContentComponent />', () => {
  let wrapper
  const alice = testUsers['alice']
  let spies

  beforeEach(() => {
    const div = document.createElement('div')
    document.body.appendChild(div)

    spies = {
      onMemosClicked: jest.fn(),
      onFollowersClicked: jest.fn(),
      onFollowingClicked: jest.fn()
    }
  })

  describe('should render', () => {
    it('without crashing', () => {
      wrapper = shallow(
        <ProfileContentComponent
          onMemosClicked={spies.onMemosClicked}
          onFollowersClicked={spies.onFollowersClicked}
          onFollowingClicked={spies.onFollowingClicked}
        />
      )
      expect(wrapper).toMatchSnapshot()
    })

    it('profile', () => {
      wrapper = shallow(
        <ProfileContentComponent
          onMemosClicked={spies.onMemosClicked}
          onFollowersClicked={spies.onFollowersClicked}
          onFollowingClicked={spies.onFollowingClicked}
          profile={alice.profile}
        />
      )
      expect(wrapper).toMatchSnapshot()
    })

    describe('tabs', () => {
      const createWrapper = pathname =>
        shallow(
          <ProfileContentComponent
            onMemosClicked={spies.onMemosClicked}
            onFollowersClicked={spies.onFollowersClicked}
            onFollowingClicked={spies.onFollowingClicked}
            profile={alice.profile}
            pathname={pathname}
          />
        )

      it('memos', () => {
        wrapper = createWrapper('memos')
        expect(wrapper).toMatchSnapshot()
      })

      it('followers', () => {
        wrapper = createWrapper('followers')
        expect(wrapper).toMatchSnapshot()
      })

      it('following', () => {
        wrapper = createWrapper('following')
        expect(wrapper).toMatchSnapshot()
      })
    })
  })
})
