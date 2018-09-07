import React from 'react'
import { shallow } from 'enzyme'
import MemoFormComponent from './memo-form.component'

describe('<MemoFormComponent />', () => {
  let wrapper

  beforeEach(() => {
    const div = document.createElement('div')
    document.body.appendChild(div)
  })

  it('renders without crashing', () => {
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
