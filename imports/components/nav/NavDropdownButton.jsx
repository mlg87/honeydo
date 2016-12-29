import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
// Measure makes setting the coordinates for the dropdown
// stupid easy
import Measure from 'react-measure'
// creates route components
import { IndexLink, Link } from 'react-router'

export default class NavDropdownButton extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isDropdownOpen: false,
      dropdownWidth: null
    }

    this.toggleDropdown = this.toggleDropdown.bind(this)
  }

  toggleDropdown() {
    this.setState({isDropdownOpen: !this.state.isDropdownOpen})
  }

  renderOptions() {
    if (!this.state.isDropdownOpen) {
      return null
    }

    return this.props.options.map((option) => (
      <li key={option.text.toString()}>
        {option.path === '/' ?
          <IndexLink to={option.path} activeClassName="active">{option.text}</IndexLink> :
          <Link to={option.path} activeClassName="active">{option.text}</Link>
        }
      </li>
    ))
  }

  getDropArrow() {
    if (this.state.isDropdownOpen) {
      return 'arrow_drop_up'
    }
    return 'arrow_drop_down'
  }

  getNavDropdownContentStyle() {
    return {
      width: this.state.dropdownWidth + 'px'
    }
  }

  render() {
    return (
      <div className="nav-dropdown-container">
        <Measure onMeasure={(dimensions) => this.setState({dropdownWidth: dimensions.width})}>
          <li>
            <a className="dropdown-button" onClick={this.toggleDropdown}>
              {this.props.text} <i className="material-icons right">{this.getDropArrow()}</i>
            </a>
          </li>
        </Measure>
        {this.state.isDropdownOpen &&
          <ul className="nav-dropdown-content" style={this.getNavDropdownContentStyle()}>
            {this.renderOptions()}
          </ul>
        }
      </div>
    )
  }
}
