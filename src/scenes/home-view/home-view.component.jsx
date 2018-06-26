import React, { Component } from 'react'

export default class HomeViewComponent extends Component {
  render() {
    return (
      <div>Welcome {this.props.userName}</div>
    )
  }
}