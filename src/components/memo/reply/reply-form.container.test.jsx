import React from 'react'
import { shallow } from 'enzyme'
import ReplyFormContainer from './reply-form.container'
import testUsers from '../../../test-utils/test-users'

describe('<ReplyFormContainer />', () => {
  let testUser
  beforeEach(() => {
    testUser = testUsers['alice']
  })

  describe('Shallow rendering', () => {
    it('renders without crashing', () => {
      const wrapper = shallow(
        <ReplyFormContainer username={testUser.username} memoId={testUser.memos[0].idx} />
      )
      expect(wrapper).toMatchSnapshot()
    })
  })
})
