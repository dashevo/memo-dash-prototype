import React from 'react'
import configureStore from 'redux-mock-store'
import { shallow } from 'enzyme'
import MemoContainer from './memo.container'

import { testUsers, testMemos } from '../../test-utils/test-data'
import { combineMemoId } from '../../store/reducers/memo.reducer'

describe('<MemoContainer />', () => {
  let store
  let wrapper
  let mockStore
  let memo
  const alice = testUsers['alice']
  const bob = testUsers['bob']

  beforeEach(() => {
    // Mock store
    mockStore = configureStore()
    memo = testMemos[alice.memoIds[0]]
    const div = document.createElement('div')
    document.body.appendChild(div)
  })

  describe('Shallow rendering', () => {
    describe('should render', () => {
      it('without crashing', () => {
        store = mockStore({})
        wrapper = shallow(<MemoContainer />, { context: { store } })
        expect(wrapper).toMatchSnapshot()
      })

      it('memo without replies', () => {
        store = mockStore({})
        wrapper = shallow(<MemoContainer memo={memo} />, { context: { store } })
        expect(wrapper).toMatchSnapshot()
      })

      it('memo with replies', () => {
        const reply = testMemos[bob.memoIds[0]]
        memo.replyIds = [combineMemoId(reply.username, reply.idx)]

        store = mockStore({
          memo: {
            memos: {
              [combineMemoId(memo.username, memo.idx)]: memo,
              [combineMemoId(reply.username, reply.idx)]: reply
            }
          }
        })

        wrapper = shallow(<MemoContainer showReplies={true} memo={memo} />, {
          context: { store }
        })
        expect(wrapper).toMatchSnapshot()
      })
    })
  })
})
