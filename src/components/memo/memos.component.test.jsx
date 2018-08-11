import React from 'react'
import { shallow } from 'enzyme'
import MemosComponent from './memos.component'
import testUsers from '../../test-utils/test-users'

describe('<MemosComponent />', () => {
  let wrapper
  let testUser

  beforeEach(() => {
    testUser = testUsers['alice']
    const div = document.createElement('div')
    document.body.appendChild(div)
  })

  it('renders without crashing', () => {
    wrapper = shallow(<MemosComponent memos={[]} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should render memos', () => {
    wrapper = shallow(<MemosComponent memos={testUser.memos} />)
    expect(wrapper).toMatchSnapshot()
  })
})
