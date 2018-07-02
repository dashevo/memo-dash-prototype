import React from 'react'
import { shallow } from 'enzyme'
import ProfileViewComponent from './profile-view.component'

describe('<ProfileViewComponent />', () => {
  let wrapper

  beforeEach(() => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    const profile = {
      avatarUrl: 'AvatarUrl',
      username: 'Username',
      bio: 'Bio',
      followersCount: 1,
      followingCount: 1
    }
    wrapper = shallow(<ProfileViewComponent profile={profile} getOwnMemos={jest.fn()} />)
  })

  it('renders without crashing', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
