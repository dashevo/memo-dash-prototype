import React from 'react'
import { shallow } from 'enzyme'
import MemoFormContainer from './memo-form.container'
import { testUsers, testMemos } from '../../../test-utils/test-data'

describe('<MemoFormContainer />', () => {
  let testUser
  beforeEach(() => {
    testUser = testUsers['alice']
  })

  describe('Shallow rendering', () => {
    it('renders without crashing', () => {
      const wrapper = shallow(
        <MemoFormContainer username={testUser.username} memoId={testMemos['[alice][1]'].idx} />
      )
      expect(wrapper).toMatchSnapshot()
    })
  })
})
