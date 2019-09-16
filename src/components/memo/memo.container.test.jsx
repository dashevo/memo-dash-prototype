import React from 'react'
import configureStore from 'redux-mock-store'
import { shallow } from 'enzyme'
import MemoContainer from './memo.container'

import { testUsers, testMemos, getAlice, getBob, getAliceMemos, getBobMemos } from "../../test-utils/test-data"

describe('<MemoContainer />', () => {
  let store
  let wrapper
  let mockStore
  let memo
  let alice
  let aliceMemos
  let bob
  let bobMemos

  beforeEach(() => {
    // Mock store
    mockStore = configureStore()

    alice = getAlice()
    aliceMemos = getAliceMemos()

    bob = getBob()
    bobMemos = getBobMemos()

    store = { user: { currentUser: alice.uname } }
    memo = aliceMemos[0]
    const div = document.createElement('div')
    document.body.appendChild(div)
  })

  describe('Shallow rendering', () => {
    describe('should render', () => {
      it('without crashing', () => {
        store = mockStore(store)
        wrapper = shallow(<MemoContainer />, { context: { store } })
        expect(wrapper).toMatchSnapshot()
      })

      it('memo without replies', () => {
        store = mockStore(store)
        wrapper = shallow(<MemoContainer memo={memo} />, { context: { store } })
        expect(wrapper).toMatchSnapshot()
      })

      it('foreign memo ', () => {
        store = mockStore(store)
        wrapper = shallow(<MemoContainer memo={bobMemos[0]} />, { context: { store } })
        expect(wrapper).toMatchSnapshot()
      })

      it('non existing memo ', () => {
        store = mockStore(store)
        wrapper = shallow(<MemoContainer memo={undefined} />, { context: { store } })
        expect(wrapper).toMatchSnapshot()
      })

      it.skip('memo with replies', () => {
        const reply = bobMemos[0]
        memo.replyIds = [reply.$scopeId]

        store = mockStore({
          ...store,
          memo: {
            memos: {
              [memo.$scopeId]: memo,
              [reply.$scopeId]: reply
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
