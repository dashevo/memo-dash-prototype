import React from 'react'
import { shallow } from 'enzyme'
import HeaderComponent from './header.component'

describe('<HeaderComponent />', () => {
  let wrapper

  beforeEach(() => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    wrapper = shallow(<HeaderComponent location="/" onHomeClicked={jest.fn()} />)
  })

  it('renders without crashing', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
