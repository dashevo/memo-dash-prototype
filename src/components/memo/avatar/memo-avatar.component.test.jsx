import React from 'react'
import { shallow } from 'enzyme'
import { Comment } from 'semantic-ui-react'

import MemoAvatarComponent from './memo-avatar.component'
import testUsers from '../../../test-utils/test-users'

describe('<MemoAvatarComponent />', () => {
  let wrapper
  const alice = testUsers['alice']

  beforeEach(() => {
    const div = document.createElement('div')
    document.body.appendChild(div)
  })

  describe('should render', () => {
    it('without crashing', () => {
      wrapper = shallow(<MemoAvatarComponent memo={alice.memos[0]} />)
      expect(wrapper).toMatchSnapshot()
    })

    it('own memo', () => {
      wrapper = shallow(<MemoAvatarComponent isMemoOfCurrentUser={true} memo={alice.memos[0]} />)
      expect(wrapper).toMatchSnapshot()
    })

    it('foreign memo', () => {
      wrapper = shallow(<MemoAvatarComponent isMemoOfCurrentUser={false} memo={alice.memos[0]} />)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('interaction', () => {
    it('should call onGoToProfileClicked when clicked on avatar', () => {
      const onGoToProfileClicked = jest.fn()
      wrapper = shallow(
        <MemoAvatarComponent
          onGoToProfileClicked={onGoToProfileClicked}
          isMemoOfCurrentUser={false}
          memo={alice.memos[0]}
        />
      )
      wrapper.find(Comment.Avatar).simulate('click')
      expect(onGoToProfileClicked).toHaveBeenCalled()
    })
  })
})
