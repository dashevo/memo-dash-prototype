import React from 'react'
import { shallow } from 'enzyme'
import { Card } from 'semantic-ui-react'

import { testUsers } from '../../../test-utils/test-data'
import ProfileInfoComponent from './profile-info.component'

describe('<ProfileInfoComponent />', () => {
  let wrapper
  const alice = testUsers['alice']

  beforeEach(() => {
    const div = document.createElement('div')
    document.body.appendChild(div)
  })

  describe('should render', () => {
    it('without crashing', () => {
      wrapper = shallow(<ProfileInfoComponent profile={alice.profile} />)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
