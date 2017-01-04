import React, { Component, PropTypes } from 'react'

export class User extends Component {
  constructor(props) {
    super(props)

    this.deleteUserFromList = this.deleteUserFromList.bind(this)
  }

  componentDidMount() {
    $('.tooltipped').tooltip({delay: 50})
  }

  componentWillUnmount() {
    $('.tooltipped').tooltip('remove')
  }

  deleteUserFromList() {
    Meteor.call('lists.removeUser', this.props.listId, this.props.user.userId)
  }

  render() {
    return (
      <li className='user-item'>

        <span>{ this.props.user.username }</span>

        <button
          className='user-item-delete clickable tooltipped'
          onClick={ this.deleteUserFromList }
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
  user: PropTypes.object.isRequired,
  listId: PropTypes.string.isRequired
}
