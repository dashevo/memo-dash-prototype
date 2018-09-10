import React from 'react'
import { shallow } from 'enzyme'
import ProfileEditContainer from './profile-edit.container'
import { testUsers, testMemos } from '../../../test-utils/test-data'

describe('<ProfileEditContainer />', () => {
  const alice = testUsers['alice']

  describe('Shallow rendering', () => {
    it('renders without crashing', () => {
      const wrapper = shallow(<ProfileEditContainer profile={alice.profile} />)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
