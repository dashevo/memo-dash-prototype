import React from "react"
import { shallow } from "enzyme"

import { getAlice, testProfiles } from "../../../test-utils/test-data"
import ProfileInfoComponent from "./profile-info.component"

describe('<ProfileInfoComponent />', () => {
  let wrapper
  let alice

  beforeEach(() => {

    alice = getAlice()

    const div = document.createElement('div')
    document.body.appendChild(div)
  })

  describe('should render', () => {
    it('without crashing', () => {
      wrapper = shallow(<ProfileInfoComponent username={alice.uname} profile={testProfiles[alice.uname]} />)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
