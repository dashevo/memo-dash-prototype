import React from 'react'
import { shallow } from 'enzyme'
import MemosComponent from './memos.component'

describe('<MemosComponent />', () => {
  let wrapper

  beforeEach(() => {
    const div = document.createElement('div')
    document.body.appendChild(div)
  })

  it('renders without crashing', () => {
    wrapper = shallow(<MemosComponent memos={[{ key: '1', memoText: 'MemoText' }]} getOwnMemos={jest.fn()} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should render memos', () => {
    const memos = [
      {
        idx: 1,
        memoDatetime: '2018-07-02T14:18:42.728Z',
        memoLikesCount: 0,
        memoRepliesCount: 0,
        memoText: 'Iusto possimus quidem modi quis.',
        memoTipTotal: 0,
        username: 'alice'
      },
      {
        idx: 2,
        memoDatetime: '2018-07-02T14:24:05.359Z',
        memoLikesCount: 1,
        memoRepliesCount: 2,
        memoText: 'Quo eligendi velit velit commodi.',
        memoTipTotal: 3,
        username: 'alice'
      }
    ]

    wrapper = shallow(<MemosComponent memos={memos} getOwnMemos={jest.fn()} />)
    expect(wrapper).toMatchSnapshot()
  })
})
