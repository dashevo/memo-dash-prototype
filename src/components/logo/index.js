import React, { Component } from 'react'
import logo from './images/logo.svg'
import './styles.css'

class Logo extends Component {
  render() {
    return (
      <span className="logo">
        <img src={logo} className="logo__image" alt="logo" />
      </span>
    )
  }
}

export default Logo
