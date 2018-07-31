import React from 'react'
import { shallow } from 'enzyme'
import ReplyFormComponent from './reply-form.component'
import { filterUser } from '../../../lib/helpers'

jest.mock('../../../lib/helpers')

describe('<ReplyFormComponent />', () => {
  let wrapper
  let testUser

  beforeEach(() => {
    testUser = filterUser('alice')
    const div = document.createElement('div')
    document.body.appendChild(div)
  })

  it('renders without crashing', () => {
    wrapper = shallow(
      <ReplyFormComponent
        values={{ message: 'replyMessage' }}
        errors={{ message: 'errorMessage' }}
        touched={{ message: 'touchedMessage' }}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
