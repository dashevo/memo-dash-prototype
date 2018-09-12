import React from 'react'
import { shallow } from 'enzyme'

import TextAreaWithCharCounter from './textarea-with-char-counter.component'

describe('<TextAreaWithCharCounter />', () => {
  beforeEach(() => {
    const div = document.createElement('div')
    document.body.appendChild(div)
  })

  describe('should render', () => {
    it('without crashing', () => {
      const wrapper = shallow(<TextAreaWithCharCounter />)
      expect(wrapper).toMatchSnapshot()
    })

    it('with max length', () => {
      const wrapper = shallow(<TextAreaWithCharCounter maxLength="10" />)
      expect(wrapper).toMatchSnapshot()
    })

    it('with content', () => {
      const wrapper = shallow(<TextAreaWithCharCounter value="value" maxLength="10" />)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
