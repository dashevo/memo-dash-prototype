import React from 'react'
import { shallow } from 'enzyme'
import { Card } from 'semantic-ui-react'

import { testUsers } from '../../../test-utils/test-data'
import ProfileOverviewComponent from './profile-overview.component'

describe('<ProfileOverviewComponent />', () => {
  let wrapper
  const alice = testUsers['alice']

  beforeEach(() => {
    const div = document.createElement('div')
    document.body.appendChild(div)
  })

  describe('should render', () => {
    it('without crashing', () => {
      wrapper = shallow(<ProfileOverviewComponent userProfile={alice.profile} />)
      expect(wrapper).toMatchSnapshot()
    })

    it('user followed by me', () => {
      wrapper = shallow(<ProfileOverviewComponent userProfile={alice.profile} following={true} />)
      expect(wrapper).toMatchSnapshot()
    })

    it('user not followed by me', () => {
      wrapper = shallow(<ProfileOverviewComponent userProfile={alice.profile} following={false} />)
      expect(wrapper).toMatchSnapshot()
    })

    it('my user', () => {
      wrapper = shallow(
        <ProfileOverviewComponent userProfile={alice.profile} isProfileOfCurrentUser={true} />
      )
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('interaction', () => {
    const fakeClickEvent = { stopPropagation() {} }
    let onGoToProfileClickedSpy

    beforeEach(() => {
      onGoToProfileClickedSpy = jest.fn()
      wrapper = shallow(
        <ProfileOverviewComponent
          userProfile={alice.profile}
          onGoToProfileClicked={onGoToProfileClickedSpy}
        />
      )
    })

    it('should call onLikeMemoClicked when clicked on like', () => {
      wrapper.find(Card).simulate('click', fakeClickEvent)
      expect(onGoToProfileClickedSpy).toHaveBeenCalled()
    })
  })
})
