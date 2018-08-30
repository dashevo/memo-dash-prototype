import React from 'react'
import { shallow } from 'enzyme'
import { Card, Button } from 'semantic-ui-react'

import { testUsers } from '../../test-utils/test-data'
import FollowButtonComponent from './follow-button.component'

describe('<FollowButtonComponent />', () => {
  let wrapper
  const alice = testUsers['alice']

  beforeEach(() => {
    const div = document.createElement('div')
    document.body.appendChild(div)
  })

  describe('should render', () => {
    it('without crashing', () => {
      wrapper = shallow(<FollowButtonComponent userProfile={alice.profile} />)
      expect(wrapper).toMatchSnapshot()
    })

    it('button for user followed by me', () => {
      wrapper = shallow(<FollowButtonComponent userProfile={alice.profile} following={true} />)
      expect(wrapper).toMatchSnapshot()
    })

    it('button for user not followed by me', () => {
      wrapper = shallow(<FollowButtonComponent userProfile={alice.profile} following={false} />)
      expect(wrapper).toMatchSnapshot()
    })

    it('nothing for my user', () => {
      wrapper = shallow(<FollowButtonComponent userProfile={alice.profile} isProfileOfCurrentUser={true} />)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('interaction', () => {
    const fakeClickEvent = { stopPropagation() {} }
    let onFollowClickedSpy
    let onUnFollowClickedSpy

    beforeEach(() => {
      onFollowClickedSpy = jest.fn()
      onUnFollowClickedSpy = jest.fn()
    })

    it('should call onFollowClicked when clicked on button', () => {
      wrapper = shallow(
        <FollowButtonComponent
          userProfile={alice.profile}
          following={false}
          onFollowClicked={onFollowClickedSpy}
        />
      )
      wrapper.find(Button).simulate('click', fakeClickEvent)
      expect(onFollowClickedSpy).toHaveBeenCalled()
    })

    it('should call onUnFollowClicked when clicked on button', () => {
      wrapper = shallow(
        <FollowButtonComponent
          userProfile={alice.profile}
          following={true}
          onUnFollowClicked={onUnFollowClickedSpy}
        />
      )
      wrapper.find(Button).simulate('click', fakeClickEvent)
      expect(onUnFollowClickedSpy).toHaveBeenCalled()
    })
  })
})
