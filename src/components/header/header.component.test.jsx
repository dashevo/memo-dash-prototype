import React from 'react'
import { shallow } from 'enzyme'
import HeaderComponent from './header.component'
import { Menu } from 'semantic-ui-react'

describe('<HeaderComponent />', () => {
  let wrapper

  beforeEach(() => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    wrapper = shallow(<HeaderComponent location="/" onHomeClicked={jest.fn()} />)
  })

  describe('should render', () => {
    it('without crashing', () => {
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('interaction', () => {
    const findMenuItem = (wrapper, text) =>
      wrapper
        .find(Menu.Item)
        .findWhere(n => n.text() === text)
        .parent()

    let spies

    beforeEach(() => {
      spies = {
        onHomeClicked: jest.fn(),
        onUsersClicked: jest.fn()
      }

      wrapper = shallow(
        <HeaderComponent
          location="/"
          onHomeClicked={spies.onHomeClicked}
          onUsersClicked={spies.onUsersClicked}
        />
      )
    })

    it('should call onHomeClicked when clicked on home', () => {
      findMenuItem(wrapper, 'Home').simulate('click')
      expect(spies.onHomeClicked).toHaveBeenCalled()
    })

    it('should call onHomeClicked when clicked on logo', () => {
      findMenuItem(wrapper, 'MemoDash').simulate('click')
      expect(spies.onHomeClicked).toHaveBeenCalled()
    })

    it('should call onUsersClicked when clicked on users', () => {
      findMenuItem(wrapper, 'Users').simulate('click')
      expect(spies.onUsersClicked).toHaveBeenCalled()
    })
  })
})
