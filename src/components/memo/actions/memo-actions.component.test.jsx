import React from 'react'
import { shallow } from 'enzyme'
import { Comment } from 'semantic-ui-react'

import MemoActionsComponent from './memo-actions.component'
import testUsers from '../../../test-utils/test-users'

describe('<MemoActionsComponent />', () => {
  let wrapper
  const alice = testUsers['alice']
  const bob = testUsers['bob']

  beforeEach(() => {
    const div = document.createElement('div')
    document.body.appendChild(div)
  })

  describe('should render', () => {
    it('without crashing', () => {
      wrapper = shallow(<MemoActionsComponent memo={alice.memos[0]} />)
      expect(wrapper).toMatchSnapshot()
    })

    it('foreign memo', () => {
      wrapper = shallow(<MemoActionsComponent isMemoOfCurrentUser={false} memo={alice.memos[0]} />)
      expect(wrapper).toMatchSnapshot()
    })

    it('foreign memo liked by current user', () => {
      wrapper = shallow(
        <MemoActionsComponent isMemoOfCurrentUser={false} likedByCurrentUser={true} memo={alice.memos[0]} />
      )
      expect(wrapper).toMatchSnapshot()
    })

    it('own memo', () => {
      wrapper = shallow(<MemoActionsComponent isMemoOfCurrentUser={true} memo={alice.memos[0]} />)
      expect(wrapper).toMatchSnapshot()
    })

    it('memo with reply form', () => {
      wrapper = shallow(<MemoActionsComponent memo={alice.memos[0]} />)
      wrapper.setState({ replyingToMemo: true })
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('interaction', () => {
    const createWrapper = (memo, likedByCurrentUser = false) =>
      shallow(
        <MemoActionsComponent
          onRemoveLikeClicked={spies.onRemoveLikeClicked}
          onLikeMemoClicked={spies.onLikeMemoClicked}
          memo={memo}
          likedByCurrentUser={likedByCurrentUser}
        />
      )

    let spies
    const fakeClickEvent = { stopPropagation() {} }

    beforeEach(() => {
      spies = {
        onRemoveLikeClicked: jest.fn(),
        onLikeMemoClicked: jest.fn()
      }
    })

    it('should set replyingToMemo to true when clicked on reply', () => {
      wrapper = createWrapper(alice.memos[0])
      expect(wrapper.state().replyingToMemo).toEqual(false)
      wrapper
        .find(Comment.Action)
        .filter({ name: 'replyAction' })
        .simulate('click', fakeClickEvent)

      expect(wrapper.state().replyingToMemo).toEqual(true)
    })

    it('should call onLikeMemoClicked when clicked on like', () => {
      wrapper = createWrapper(alice.memos[0])
      wrapper
        .find(Comment.Action)
        .filter({ name: 'likeAction' })
        .simulate('click', fakeClickEvent)

      expect(spies.onLikeMemoClicked).toHaveBeenCalled()
    })

    it('should call onRemoveLikeClicked when clicked on unlike', () => {
      wrapper = createWrapper(alice.memos[0], true)
      wrapper
        .find(Comment.Action)
        .filter({ name: 'likeAction' })
        .simulate('click', fakeClickEvent)
      expect(spies.onRemoveLikeClicked).toHaveBeenCalled()
    })
  })
})
