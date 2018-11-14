import React from 'react'
import { shallow } from 'enzyme'
import ErrorBoundaryComponent from './error-boundary.component'

describe('<ErrorBoundaryComponent />', () => {
  let wrapper

  beforeEach(() => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    wrapper = shallow(<ErrorBoundaryComponent />)
  })

  describe('should render', () => {
    describe('without crashing', () => {
      it('when no error happend', () => {
        expect(wrapper).toMatchSnapshot()
      })
      it('when error happend', () => {
        wrapper.setState({ hasError: true })
        expect(wrapper).toMatchSnapshot()
      })
    })
  })
})
