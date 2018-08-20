import React from 'react'
import { shallow } from 'enzyme'
import ReplyFormContainer from './reply-form.container'
import { testUsers, testMemos } from '../../../test-utils/test-data'

describe('<ReplyFormContainer />', () => {
  let testUser
  beforeEach(() => {
    testUser = testUsers['alice']
  })

  describe('Shallow rendering', () => {
    it('renders without crashing', () => {
      const wrapper = shallow(
        <ReplyFormContainer username={testUser.username} memoId={testMemos['[alice][1]'].idx} />
      )
      expect(wrapper).toMatchSnapshot()
    })
  })
})
