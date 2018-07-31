import React from 'react'
import { shallow } from 'enzyme'
import MemosComponent from './memos.component'
import { filterUser } from '../../lib/helpers'

jest.mock('../../lib/helpers')

describe('<MemosComponent />', () => {
  let wrapper
  let testUser

  beforeEach(() => {
    testUser = filterUser('alice')
    const div = document.createElement('div')
    document.body.appendChild(div)
  })

  it('renders without crashing', () => {
    wrapper = shallow(<MemosComponent memos={[{ key: '1', memoText: 'MemoText' }]} getOwnMemos={jest.fn()} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should render memos', () => {
    wrapper = shallow(<MemosComponent memos={testUser.memos} getOwnMemos={jest.fn()} />)
    expect(wrapper).toMatchSnapshot()
  })
})
