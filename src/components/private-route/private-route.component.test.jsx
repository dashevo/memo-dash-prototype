import React from 'react'
import { shallow, mount } from 'enzyme'

import { MemoryRouter } from 'react-router-dom'

// partial mock of react-router
jest.mock('react-router', () => {
  const lib = require.requireActual('react-router')
  return { ...lib, Redirect: 'redirectfake' }
})

import PrivateRouteComponent from './private-route.component'

describe('<PrivateRouteComponent />', () => {
  let wrapper

  beforeEach(() => {
    const div = document.createElement('div')
    document.body.appendChild(div)
  })

  it('renders without crashing', () => {
    wrapper = shallow(<PrivateRouteComponent isLoggedIn={false} />)
    expect(wrapper).toMatchSnapshot()
  })

  describe('Redirect', () => {
    class TestComponent extends React.Component {
      render() {
        return <div />
      }
    }

    const createWrapper = isLoggedIn =>
      mount(
        <MemoryRouter initialEntries={['/home']}>
          <PrivateRouteComponent component={TestComponent} isLoggedIn={isLoggedIn} />
        </MemoryRouter>
      )

    it('should redirect to / if user is not logged in', () => {
      const wrapper = createWrapper(false)
      expect(wrapper.find('redirectfake')).toHaveLength(1)
    })

    it('should redirect to / if user is not logged in', () => {
      const wrapper = createWrapper(true)

      expect(wrapper.find('redirectfake')).toHaveLength(0)
      expect(wrapper.find(TestComponent)).toHaveLength(1)
    })
  })
})
