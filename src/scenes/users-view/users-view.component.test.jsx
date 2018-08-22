import React from 'react'
import { shallow } from 'enzyme'
import UsersViewComponent from './users-view.component'
import { testUsers } from '../../test-utils/test-data'

describe('<UsersViewComponent />', () => {
  let wrapper
  const alice = testUsers['alice']

  beforeEach(() => {
    const div = document.createElement('div')
    document.body.appendChild(div)
  })

  it('renders without crashing', () => {
    wrapper = shallow(<UsersViewComponent getAllUsers={jest.fn()} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('renders user profiles', () => {
    wrapper = shallow(
      <UsersViewComponent currentUser={alice.username} users={testUsers} getAllUsers={jest.fn()} />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
