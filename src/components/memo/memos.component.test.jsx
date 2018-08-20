import React from 'react'
import { shallow } from 'enzyme'
import MemosComponent from './memos.component'
import { testMemos } from '../../test-utils/test-data'

describe('<MemosComponent />', () => {
  let wrapper

  beforeEach(() => {
    const div = document.createElement('div')
    document.body.appendChild(div)
  })

  it('renders without crashing', () => {
    wrapper = shallow(<MemosComponent memos={[]} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should render memos', () => {
    wrapper = shallow(<MemosComponent memos={testMemos} />)
    expect(wrapper).toMatchSnapshot()
  })
})
