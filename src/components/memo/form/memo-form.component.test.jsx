import React from 'react'
import { shallow } from 'enzyme'
import MemoFormComponent from './memo-form.component'
import { testUsers, testMemos } from '../../../test-utils/test-data'
import { Button, Form } from 'semantic-ui-react'

describe('<MemoFormComponent />', () => {
  let wrapper

  beforeEach(() => {
    const div = document.createElement('div')
    document.body.appendChild(div)
  })

  describe('should render', () => {
    it('without crashing', () => {
      wrapper = shallow(
        <MemoFormComponent
          values={{ message: 'replyMessage' }}
          errors={{ message: 'errorMessage' }}
          touched={{ message: 'touchedMessage' }}
          buttonLabel="Add Reply"
        />
      )
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('interaction', () => {
    const createWrapper = (memo, spies) =>
      shallow(
        <MemoFormComponent
          values={{ message: 'replyMessage' }}
          errors={{ message: 'errorMessage' }}
          touched={{ message: 'touchedMessage' }}
          buttonLabel="Edit"
          handleSubmit={spies.handleSubmit}
          onCanceled={spies.onCanceled}
          memo={memo}
        />
      )

    let spies
    const fakeClickEvent = { stopPropagation() {} }
    const alice = testUsers['alice']
    const ownMemo = testMemos[alice.memoIds[0]]

    beforeEach(() => {
      spies = {
        handleSubmit: jest.fn(),
        onCanceled: jest.fn()
      }
    })

    it('should call handleSubmit submitting form', () => {
      wrapper = createWrapper(ownMemo, spies)
      wrapper.find(Form).simulate('submit', fakeClickEvent)
      expect(spies.handleSubmit).toHaveBeenCalled()
    })

    it('should call onCanceled when reseting form', () => {
      wrapper = createWrapper(ownMemo, spies)
      wrapper
        .find(Button)
        .filter({ type: 'reset' })
        .simulate('click', fakeClickEvent)
      expect(spies.onCanceled).toHaveBeenCalled()
    })
  })
})
