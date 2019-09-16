import React from 'react'
import { shallow } from 'enzyme'
import ProfileEditContainer from './profile-edit.container'
import { testUsers, testMemos, getAlice, testProfiles } from "../../../test-utils/test-data"

describe('<ProfileEditContainer />', () => {

  let alice

  beforeEach(() => {
    alice = getAlice()
  })

  describe('Shallow rendering', () => {
    it('renders without crashing', () => {
      const wrapper = shallow(<ProfileEditContainer username={alice.uname} profile={testProfiles[alice.uname]} />)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
