import React from 'react'
import { shallow } from 'enzyme'
import HomeViewComponent from './home-view.component'

describe('<HomeViewComponent />', () => {
  let wrapper

  beforeEach(() => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    wrapper = shallow(<HomeViewComponent getMemos={jest.fn()} />)
  })

  it('renders without crashing', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
