import React from 'react'
import logo from './images/logo.svg'
import './styles.css'

const Logo = () => {
  return (
    <span className="logo">
      <img src={logo} className="logo__image" alt="logo" />
    </span>
  )
}

export default Logo
