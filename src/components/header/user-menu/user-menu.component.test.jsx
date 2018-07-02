import React from 'react'
import { shallow } from 'enzyme'
import UserMenuComponent from './user-menu.component'

describe('<UserMenuComponent />', () => {
  let wrapper

  beforeEach(() => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    wrapper = shallow(
      <UserMenuComponent
        username="Alice"
        avatar="Avatar"
        location="/"
        onSignOutClicked={jest.fn()}
        onProfileClicked={jest.fn()}
      />
    )
  })

  it('renders without crashing', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
