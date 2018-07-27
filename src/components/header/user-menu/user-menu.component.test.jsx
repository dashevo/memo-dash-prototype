import React from 'react'
import { shallow } from 'enzyme'
import UserMenuComponent from './user-menu.component'

describe('<UserMenuComponent />', () => {
  let wrapper

  beforeEach(() => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    const user = { username: 'Alice', avatar: 'Avatar' }
    wrapper = shallow(
      <UserMenuComponent user={user} location="/" onSignOutClicked={jest.fn()} onProfileClicked={jest.fn()} />
    )
  })

  it('renders without crashing', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
