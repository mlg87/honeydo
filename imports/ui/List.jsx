import React, { Component, PropTypes } from 'react'
// collection
import { Lists } from '../api/lists'
// components
import { User } from './User'

export class List extends Component {
  componentDidMount() {
    $('.tooltipped').tooltip({delay: 50})
  }

  // not sure why the fuck this wont work?
  renderUsers(users) {
    return users.map((user) => {
      <User key={ user.userId } user={ user } />
    })
  }

  deleteList() {
    Meteor.call('lists.remove', this.props.list._id)
  }

  addUserToList() {
    console.log('were gonna add a user');
  }

  render() {
    const users = this.props.list.users

    return (
      <li className='fader'>

        <button
          className='list-delete clickable tooltipped'
          onClick={ this.deleteList.bind(this) }
          data-position='top'
          data-tooltip={`This will permanently remove ${this.props.list.name} and all of it\'s tasks`}
        >
          &times;
        </button>

        <h5>
          { this.props.list.name }
        </h5>

        <ul>

          { users.map((user) =>
            <User key={ user.userId} user={ user } />
          )}

        </ul>

          <a
            className='padding-left-15 waves-effect waves-green btn-flat'
            onClick={ this.addUserToList.bind(this) }
            >
            add user to list
          </a>

      </li>
    )
  }
}

List.propTypes = {
  list: PropTypes.object.isRequired
}
