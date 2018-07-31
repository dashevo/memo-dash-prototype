import React from 'react'
import { shallow } from 'enzyme'
import ReplyFormContainer from './reply-form.container'
import { filterUser } from '../../../lib/helpers'

jest.mock('../../../lib/helpers')

describe('<ReplyFormContainer />', () => {
  let testUser
  beforeEach(() => {
    testUser = filterUser('alice')
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
