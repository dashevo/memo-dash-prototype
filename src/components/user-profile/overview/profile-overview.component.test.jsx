import React from "react"
import { shallow } from "enzyme"
import { Card } from "semantic-ui-react"

import { getAlice, testProfiles } from "../../../test-utils/test-data"
import ProfileOverviewComponent from "./profile-overview.component"

describe('<ProfileOverviewComponent />', () => {
  let wrapper
  let alice
  let aliceProfile

  beforeEach(() => {
    alice = getAlice()
    aliceProfile = testProfiles[alice.uname]

    const div = document.createElement('div')
    document.body.appendChild(div)
  })

  describe('should render', () => {
    it('without crashing', () => {
      wrapper = shallow(<ProfileOverviewComponent username={alice.uname} userProfile={aliceProfile} />)
      expect(wrapper).toMatchSnapshot()
    })

    it('without profile', () => {
      wrapper = shallow(<ProfileOverviewComponent userProfile={undefined} />)
      expect(wrapper).toMatchSnapshot()
    })

    it('without username', () => {
      wrapper = shallow(<ProfileOverviewComponent username={undefined} userProfile={aliceProfile} />)
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
          username={alice.uname}
          userProfile={aliceProfile}
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
