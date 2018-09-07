import React from 'react'
import { shallow } from 'enzyme'
import { Button } from 'semantic-ui-react'

import MemoContentComponent from './memo-content.component'
import { testUsers, testMemos } from '../../../test-utils/test-data'

describe('<MemoContentComponent />', () => {
  let wrapper

  beforeEach(() => {
    const div = document.createElement('div')
    document.body.appendChild(div)
  })

  describe('should render', () => {
    it('without crashing', () => {
      wrapper = shallow(<MemoContentComponent memo={'memo'} />)
      expect(wrapper).toMatchSnapshot()
    })

    it('edit button', () => {
      wrapper = shallow(<MemoContentComponent memo={'memo'} showEdit="true" />)
      expect(wrapper).toMatchSnapshot()
    })

    it('edit form', () => {
      wrapper = shallow(<MemoContentComponent memo={'memo'} showEdit="true" />)
      wrapper.setState({ editing: true })
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('interaction', () => {
    const createWrapper = (memo, showEdit) =>
      shallow(
        <MemoContentComponent
          onGoToProfileClicked={spies.onGoToProfileClicked}
          onEditClicked={spies.onEditClicked}
          showEdit={showEdit}
          memo={memo}
        />
      )

    let spies
    const fakeClickEvent = { stopPropagation() {} }
    const alice = testUsers['alice']
    const ownMemo = testMemos[alice.memoIds[0]]

    beforeEach(() => {
      spies = {
        onGoToProfileClicked: jest.fn(),
        onEditClicked: jest.fn()
      }
    })

    it('should set editing to true when clicked on edit', () => {
      wrapper = createWrapper(ownMemo, true)
      expect(wrapper.state().editing).toEqual(false)
      wrapper
        .find(Button)
        .filter({ icon: 'edit' })
        .simulate('click', fakeClickEvent)

      expect(wrapper.state().editing).toEqual(true)
    })
  })
})
