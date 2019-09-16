import React from 'react'
import { shallow } from 'enzyme'
import ProfileEditComponent from './profile-edit.component'
import { testUsers, testMemos, getAlice, testProfiles } from "../../../test-utils/test-data"
import { Button, Form } from 'semantic-ui-react'

describe('<ProfileEditComponent />', () => {
  let wrapper
  let alice
  let aliceProfile

  beforeEach(() => {
    alice = getAlice()
    aliceProfile = testProfiles[alice.uname]
    const div = document.createElement('div')
    document.body.appendChild(div)
  })

  describe('should render', () => {
    it('without crashing', () => {
      wrapper = shallow(
        <ProfileEditComponent
          username={alice.uname}
          profile={aliceProfile}
          values={{ username: 'alice', text: 'text' }}
          errors={{}}
        />
      )
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('interaction', () => {
    const createWrapper = spies =>
      shallow(
        <ProfileEditComponent
          username={alice.uname}
          profile={aliceProfile}
          values={{ username: 'alice', text: 'text' }}
          errors={{}}
          handleSubmit={spies.handleSubmit}
          onCanceled={spies.onCanceled}
        />
      )

    let spies
    const fakeClickEvent = { stopPropagation() {} }
    const alice = testUsers['alice']

    beforeEach(() => {
      spies = {
        handleSubmit: jest.fn(),
        onCanceled: jest.fn()
      }
    })

    it('should call handleSubmit submitting form', () => {
      wrapper = createWrapper(spies)
      wrapper.find(Form).simulate('submit', fakeClickEvent)
      expect(spies.handleSubmit).toHaveBeenCalled()
    })

    it('should call onCanceled when reseting form', () => {
      wrapper = createWrapper(spies)
      wrapper
        .find(Button)
        .filter({ type: 'reset' })
        .simulate('click', fakeClickEvent)
      expect(spies.onCanceled).toHaveBeenCalled()
    })
  })
})
