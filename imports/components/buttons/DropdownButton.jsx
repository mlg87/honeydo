import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

export default class DropdownButton extends Component {
  renderOptions() {
    return this.props.options.map((option) => (
      <li key={option.text.toString()}>
        <a onClick={option.click}>
          {option.text}
        </a>
      </li>
    ))
  }

  render() {
    return (
      <div className="dropdown-container">
        <a className="dropdown-btn btn" data-activates={this.props.target}>
          {this.props.text}
        </a>
        <ul id={this.props.target} className="dropdown-content">
          {this.renderOptions()}
        </ul>
      </div>
    )
  }
}
