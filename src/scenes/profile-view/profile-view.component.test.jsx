import React from 'react'
import { shallow } from 'enzyme'
import ProfileViewComponent from './profile-view.component'

describe('<ProfileViewComponent />', () => {
  let profile
  let match
  let spies

  beforeEach(() => {
    const div = document.createElement('div')
    document.body.appendChild(div)

    profile = {
      avatarUrl: 'AvatarUrl',
      username: 'Username',
      bio: 'Bio',
      followersCount: 1,
      followingCount: 1
    }
    match = { params: { username: 'username' } }

    spies = {
      getUser: jest.fn(),
      getMemosForUser: jest.fn(),
      onMemosClicked: jest.fn(),
      onFollowersClicked: jest.fn(),
      onFollowingClicked: jest.fn()
    }
  })

  it('renders loader without crashing', () => {
    const wrapper = shallow(
      <ProfileViewComponent profile={undefined} match={match} memos={undefined} {...spies} />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('renders memos without crashing', () => {
    const memos = [{ message: 'message', createdAt: 'createdAt' }]
    const wrapper = shallow(<ProfileViewComponent profile={profile} match={match} memos={memos} {...spies} />)
    expect(wrapper).toMatchSnapshot()
  })
})
