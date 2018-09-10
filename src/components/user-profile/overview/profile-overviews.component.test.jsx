import React from 'react'
import { shallow } from 'enzyme'
import ProfileOverviewsComponent from './profile-overviews.component'
import { testUsers } from '../../../test-utils/test-data'

describe('<ProfileOverviewsComponent />', () => {
  let wrapper
  let userProfiles

  beforeEach(() => {
    userProfiles = Object.values(testUsers).map(testUser => testUser.profile)
    const div = document.createElement('div')
    document.body.appendChild(div)
  })

  it('renders without crashing', () => {
    wrapper = shallow(<ProfileOverviewsComponent userProfiles={[]} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should render memos', () => {
    wrapper = shallow(<ProfileOverviewsComponent userProfiles={userProfiles} />)
    expect(wrapper).toMatchSnapshot()
  })
})
