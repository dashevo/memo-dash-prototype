import React from 'react'
import { shallow } from 'enzyme'
import LoginViewComponent from './login-view.component'

describe('<LoginViewComponent />', () => {
  let wrapper

  beforeEach(() => {
    const div = document.createElement('div')
    document.body.appendChild(div)
  })

  it('renders without crashing', () => {
    wrapper = shallow(<LoginViewComponent />)
    expect(wrapper).toMatchSnapshot()
  })

  it('renders error message if login failed', () => {
    wrapper = shallow(<LoginViewComponent loginError="LoginError" />)
    expect(wrapper).toMatchSnapshot()
  })
})
