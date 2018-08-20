import React from 'react'
import { shallow } from 'enzyme'

import MemoContentComponent from './memo-content.component'
import { testUsers } from '../../../test-utils/test-data'

describe('<MemoContentComponent />', () => {
  let wrapper
  const alice = testUsers['alice']
  const bob = testUsers['bob']

  beforeEach(() => {
    const div = document.createElement('div')
    document.body.appendChild(div)
  })

  describe('should render', () => {
    it('without crashing', () => {
      wrapper = shallow(<MemoContentComponent memo={'memo'} />)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
