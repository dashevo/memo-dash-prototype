import React from 'react'
import { shallow } from 'enzyme'
import { Modal, Button } from 'semantic-ui-react'

import MemoDeleteComponent from './memo-delete.component'
import { testUsers, testMemos } from '../../../test-utils/test-data'

describe('<MemoDeleteComponent />', () => {
  let wrapper
  const alice = testUsers['alice']
  const memo = testMemos[alice.memoIds[0]]
  const fakeClickEvent = { stopPropagation() {} }

  beforeEach(() => {
    const div = document.createElement('div')
    document.body.appendChild(div)
  })

  describe('should render', () => {
    it('without crashing', () => {
      wrapper = shallow(<MemoDeleteComponent />)
      expect(wrapper).toMatchSnapshot()
    })

    it('only button if not opened', () => {
      wrapper = shallow(<MemoDeleteComponent memo={memo} />)
      wrapper.instance().close(fakeClickEvent)
      expect(wrapper).toMatchSnapshot()
    })

    it('button and modal if opened', () => {
      wrapper = shallow(<MemoDeleteComponent memo={memo} />)
      wrapper.instance().show(fakeClickEvent)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('interaction', () => {
    let onDeleteMemoClicked
    beforeEach(() => {
      onDeleteMemoClicked = jest.fn()
      wrapper = shallow(<MemoDeleteComponent onDeleteMemoClicked={onDeleteMemoClicked} memo={memo} />)
      wrapper.instance().show(fakeClickEvent)
    })

    it('should not call onDeleteMemoClicked when clicked on no', () => {
      wrapper
        .find(Button)
        .find({ negative: true })
        .simulate('click', fakeClickEvent)
      expect(onDeleteMemoClicked).not.toHaveBeenCalled()
    })

    it('should call onDeleteMemoClicked when clicked on yes', () => {
      wrapper
        .find(Button)
        .find({ positive: true })
        .simulate('click', fakeClickEvent)
      expect(onDeleteMemoClicked).toHaveBeenCalled()
    })
  })
})
