import React from 'react'
import { shallow } from 'enzyme'
import UserProfilesComponent from './user-profiles.component'
import { testUsers } from '../../test-utils/test-data'

describe('<UserProfilesComponent />', () => {
  let wrapper
  let userProfiles

  beforeEach(() => {
    userProfiles = Object.values(testUsers).map(testUser => testUser.profile)
    const div = document.createElement('div')
    document.body.appendChild(div)
  })

  it('renders without crashing', () => {
    wrapper = shallow(<UserProfilesComponent userProfiles={[]} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should render memos', () => {
    wrapper = shallow(<UserProfilesComponent userProfiles={userProfiles} />)
    expect(wrapper).toMatchSnapshot()
  })
})
