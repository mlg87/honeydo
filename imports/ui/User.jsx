import React, { Component, PropTypes } from 'react'

export class User extends Component {
  componentDidMount() {
    $('.tooltipped').tooltip({delay: 50})
  }

  render() {
    return (
      <li className='user-item'>

        <span>{ this.props.user.username }</span>

        <button
          className='user-item-delete clickable tooltipped'
          data-position='top'
          data-delay='50'
          data-tooltip={'Remove ' + this.props.user.username + ' from the list'}
        >
          &times;
        </button>

      </li>
    )
  }
}

User.propTypes = {
  user: PropTypes.object.isRequired
}
