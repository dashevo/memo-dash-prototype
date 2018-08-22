import React from 'react'
import { shallow } from 'enzyme'
import { Card } from 'semantic-ui-react'

import { testUsers } from '../../test-utils/test-data'
import UserProfileComponent from './user-profile.component'

describe('<UserProfileComponent />', () => {
  let wrapper
  const alice = testUsers['alice']

  beforeEach(() => {
    const div = document.createElement('div')
    document.body.appendChild(div)
  })

  describe('should render', () => {
    it('without crashing', () => {
      wrapper = shallow(<UserProfileComponent userProfile={alice.profile} />)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('interaction', () => {
    const fakeClickEvent = { stopPropagation() {} }
    let onGoToProfileClickedSpy

    beforeEach(() => {
      onGoToProfileClickedSpy = jest.fn()
      wrapper = shallow(
        <UserProfileComponent userProfile={alice.profile} onGoToProfileClicked={onGoToProfileClickedSpy} />
      )
    })

    it('should call onLikeMemoClicked when clicked on like', () => {
      wrapper.find(Card).simulate('click', fakeClickEvent)
      expect(onGoToProfileClickedSpy).toHaveBeenCalled()
    })
  })
})
