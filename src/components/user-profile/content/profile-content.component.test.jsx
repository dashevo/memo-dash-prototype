import React from 'react'
import { shallow } from 'enzyme'
import { Card } from 'semantic-ui-react'

import { testUsers, testMemos, testProfiles, getAlice } from "../../../test-utils/test-data"
import ProfileContentComponent from './profile-content.component'

describe('<ProfileContentComponent />', () => {

  let wrapper
  let spies
  let alice
  let aliceProfile

  beforeEach(() => {
    const div = document.createElement('div')
    document.body.appendChild(div)

    spies = {
      onMemosClicked: jest.fn(),
      onFollowersClicked: jest.fn(),
      onFollowingClicked: jest.fn(),
      onLikedMemosClicked: jest.fn()
    }

    alice = getAlice()
    aliceProfile = testProfiles[alice.uname]
  })

  describe('should render', () => {
    it('without crashing', () => {
      wrapper = shallow(
        <ProfileContentComponent
          onMemosClicked={spies.onMemosClicked}
          onFollowersClicked={spies.onFollowersClicked}
          onFollowingClicked={spies.onFollowingClicked}
          onLikedMemosClicked={spies.onLikedMemosClicked}
        />
      )
      expect(wrapper).toMatchSnapshot()
    })

    it.skip('profile', () => {
      wrapper = shallow(
        <ProfileContentComponent
          onMemosClicked={spies.onMemosClicked}
          onFollowersClicked={spies.onFollowersClicked}
          onFollowingClicked={spies.onFollowingClicked}
          onLikedMemosClicked={spies.onLikedMemosClicked}
          profile={aliceProfile}
        />
      )
      expect(wrapper).toMatchSnapshot()
    })

    describe.skip('tabs', () => {
      const createWrapper = pathname =>
        shallow(
          <ProfileContentComponent
            onMemosClicked={spies.onMemosClicked}
            onFollowersClicked={spies.onFollowersClicked}
            onFollowingClicked={spies.onFollowingClicked}
            onLikedMemosClicked={spies.onLikedMemosClicked}
            profile={aliceProfile}
            likedMemos={testMemos}
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

      it('liked memos', () => {
        wrapper = createWrapper('likedMemos')
        expect(wrapper).toMatchSnapshot()
      })
    })
  })
})
