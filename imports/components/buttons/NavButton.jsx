import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

export default class NavButton extends Component {
  render() {
    return (
      <li>
        <a onClick={this.props.onClick}>{this.props.text}</a>
      </li>
    )
  }
}
