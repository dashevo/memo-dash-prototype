import React from 'react'
import { shallow } from 'enzyme'
import ProfileViewComponent from './profile-view.component'

describe('<ProfileViewComponent />', () => {
  let profile
  let match

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
  })

  it('renders loader without crashing', () => {
    const wrapper = shallow(
      <ProfileViewComponent
        profile={undefined}
        match={match}
        memos={undefined}
        getUser={jest.fn()}
        getMemosForUser={jest.fn()}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('renders memos without crashing', () => {
    const memos = [{ message: 'message', createdAt: 'createdAt' }]
    const wrapper = shallow(<ProfileViewComponent profile={profile} match={match} memos={memos} />)
    expect(wrapper).toMatchSnapshot()
  })
})
