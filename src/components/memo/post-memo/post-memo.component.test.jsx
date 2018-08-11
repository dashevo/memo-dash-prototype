import React from 'react'
import { shallow } from 'enzyme'
import PostMemoComponent from './post-memo.component'

describe('<PostMemoComponent />', () => {
  let wrapper

  beforeEach(() => {
    const div = document.createElement('div')
    document.body.appendChild(div)
  })

  it('renders without crashing', () => {
    wrapper = shallow(
      <PostMemoComponent
        values={{ message: 'message' }}
        errors={{ message: 'errorMessage' }}
        touched={{ message: 'touchedMessage' }}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
