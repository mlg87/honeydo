import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

export default class Nav extends Component {
  render() {
    console.log('made it');
    return (
      <nav>
        <div className="nav-wrapper">
          <a href="#" className="brand-logo">Weaver-Goetz Household Tasks</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><a href="#">Create Account</a></li>
            <li><a href="#">Sign In</a></li>
          </ul>
        </div>
      </nav>
    )
  }
}
