import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import ListButton from '../buttons/ListButton.jsx'
import NavDropdownButton from './NavDropdownButton.jsx'

export default class NavButton extends Component {
  render() {
    if(this.props.buttonType === 'dropdown') {
      return <NavDropdownButton text={this.props.text} options={this.props.options} />
    }
    else {
      return <ListButton onClick={this.props.onClick} text={this.props.text} />
    }
  }
}
