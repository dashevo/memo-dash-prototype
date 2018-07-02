import React from 'react'
import { shallow } from 'enzyme'
import MemoComponent from './memo.component'

describe('<MemoComponent />', () => {
  let wrapper

  beforeEach(() => {
    const div = document.createElement('div')
    document.body.appendChild(div)
  })

  it('renders without crashing', () => {
    wrapper = shallow(<MemoComponent memo={'memo'} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should render memo', () => {
    const memo = [
      {
        idx: 1,
        memoDatetime: '2018-07-02T14:18:42.728Z',
        memoLikesCount: 0,
        memoRepliesCount: 0,
        memoText: 'Iusto possimus quidem modi quis.',
        memoTipTotal: 0,
        username: 'alice'
      }
    ]

    wrapper = shallow(<MemoComponent memo={memo} />)
    expect(wrapper).toMatchSnapshot()
  })
})
