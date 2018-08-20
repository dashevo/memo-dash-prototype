import React from 'react'
import { shallow } from 'enzyme'
import { Comment } from 'semantic-ui-react'

import MemoAvatarComponent from './memo-avatar.component'
import { testUsers, testMemos } from '../../../test-utils/test-data'

describe('<MemoAvatarComponent />', () => {
  let wrapper
  const alice = testUsers['alice']
  const ownMemo = testMemos[alice.memoIds[0]]

  beforeEach(() => {
    const div = document.createElement('div')
    document.body.appendChild(div)
  })

  describe('should render', () => {
    it('without crashing', () => {
      wrapper = shallow(<MemoAvatarComponent memo={ownMemo} />)
      expect(wrapper).toMatchSnapshot()
    })

    it('own memo', () => {
      wrapper = shallow(<MemoAvatarComponent isMemoOfCurrentUser={true} memo={ownMemo} />)
      expect(wrapper).toMatchSnapshot()
    })

    it('foreign memo', () => {
      const bob = testUsers['bob']
      const foreignMemo = testMemos[bob.memoIds[0]]
      wrapper = shallow(<MemoAvatarComponent isMemoOfCurrentUser={false} memo={foreignMemo} />)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('interaction', () => {
    it('should call onGoToProfileClicked when clicked+# on avatar', () => {
      const onGoToProfileClicked = jest.fn()
      wrapper = shallow(
        <MemoAvatarComponent
          onGoToProfileClicked={onGoToProfileClicked}
          isMemoOfCurrentUser={false}
          memo={ownMemo}
        />
      )
      wrapper.find(Comment.Avatar).simulate('click')
      expect(onGoToProfileClicked).toHaveBeenCalled()
    })
  })
})
