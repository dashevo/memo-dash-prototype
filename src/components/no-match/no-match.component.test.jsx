import React from 'react'
import { shallow } from 'enzyme'
import NoMatch from './no-match.component'

describe('<NoMatch />', () => {
  let wrapper

  beforeEach(() => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    wrapper = shallow(<NoMatch location={{ pathname: '/test' }} />)
  })

  it('renders without crashing', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
