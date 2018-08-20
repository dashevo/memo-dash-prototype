import React from 'react'
import { shallow } from 'enzyme'
import { Modal } from 'semantic-ui-react'

import MemoModalComponent from './memo-modal.component'
import { testUsers, testMemos } from '../../../test-utils/test-data'

describe('<MemoModalComponent />', () => {
  let wrapper
  const alice = testUsers['alice']
  const memo = testMemos[alice.memoIds[0]]

  beforeEach(() => {
    const div = document.createElement('div')
    document.body.appendChild(div)
  })

  describe('should render', () => {
    it('without crashing', () => {
      wrapper = shallow(<MemoModalComponent />)
      expect(wrapper).toMatchSnapshot()
    })

    it('not render memo if not opened', () => {
      wrapper = shallow(<MemoModalComponent memo={memo} opened={false} />)
      expect(wrapper).toMatchSnapshot()
    })

    it('render memo if opened', () => {
      wrapper = shallow(<MemoModalComponent memo={memo} opened={true} />)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('interaction', () => {
    it('should call onModalCloseClicked when clicked on close', () => {
      const onModalCloseClicked = jest.fn()
      wrapper = shallow(
        <MemoModalComponent onModalCloseClicked={onModalCloseClicked} memo={memo} opened={true} />
      )
      wrapper.find(Modal).simulate('close')
      expect(onModalCloseClicked).toHaveBeenCalled()
    })
  })
})
