import React from 'react'
import logo from './images/logo.png'
import './logo.styles.css'

const Logo = () => {
  return (
    <span className="logo">
      <img src={logo} className="logo__image" alt="logo" />
    </span>
  )
}

export default Logo
