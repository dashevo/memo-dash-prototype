import React from 'react'
import { shallow } from 'enzyme'
import { Comment } from 'semantic-ui-react'
import MemoComponent from './memo.component'
import { filterUser } from '../../lib/helpers'

jest.mock('../../lib/helpers')

describe('<MemoComponent />', () => {
  let wrapper
  const alice = filterUser('alice')
  const bob = filterUser('bob')

  beforeEach(() => {
    const div = document.createElement('div')
    document.body.appendChild(div)
  })

  describe('should render', () => {
    it('without crashing', () => {
      wrapper = shallow(<MemoComponent memo={'memo'} />)
      expect(wrapper).toMatchSnapshot()
    })

    it('foreign memo', () => {
      wrapper = shallow(<MemoComponent currentUser={bob.username} memo={alice.memos[0]} />)
      expect(wrapper).toMatchSnapshot()
    })

    it('own memo', () => {
      wrapper = shallow(<MemoComponent currentUser={alice.username} memo={alice.memos[0]} />)
      expect(wrapper).toMatchSnapshot()
    })

    it('memo with reply form', () => {
      wrapper = shallow(<MemoComponent currentUser={alice.username} memo={alice.memos[0]} />)
      wrapper.setState({ replyingToMemo: true })
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('interaction', () => {
    const createWrapper = (username, memo, likedByMe = false) =>
      shallow(
        <MemoComponent
          onGoToProfileClicked={spies.onGoToProfileClicked}
          onRemoveLikeClicked={spies.onRemoveLikeClicked}
          onLikeMemoClicked={spies.onLikeMemoClicked}
          currentUser={username}
          memo={memo}
          likedByMe={likedByMe}
        />
      )

    let spies

    beforeEach(() => {
      spies = {
        onGoToProfileClicked: jest.fn(),
        onRemoveLikeClicked: jest.fn(),
        onLikeMemoClicked: jest.fn()
      }
    })

    it('should set replyingToMemo to true when clicked on reply', () => {
      wrapper = createWrapper(bob.username, alice.memos[0])
      expect(wrapper.state().replyingToMemo).toEqual(false)
      wrapper
        .find(Comment.Action)
        .filter({ name: 'replyAction' })
        .simulate('click')

      expect(wrapper.state().replyingToMemo).toEqual(true)
    })

    it('should call onGoToProfileClicked when clicked on avatar', () => {
      wrapper = createWrapper(bob.username, alice.memos[0])
      wrapper.find(Comment.Avatar).simulate('click')
      expect(spies.onGoToProfileClicked).toHaveBeenCalled()
    })

    it('should call onLikeMemoClicked when clicked on like', () => {
      wrapper = createWrapper(bob.username, alice.memos[0])
      wrapper
        .find(Comment.Action)
        .filter({ name: 'likeAction' })
        .simulate('click')

      expect(spies.onLikeMemoClicked).toHaveBeenCalled()
    })

    it('should call onRemoveLikeClicked when clicked on unlike', () => {
      wrapper = createWrapper(bob.username, alice.memos[0], true)
      wrapper
        .find(Comment.Action)
        .filter({ name: 'likeAction' })
        .simulate('click')
      expect(spies.onRemoveLikeClicked).toHaveBeenCalled()
    })
  })
})
