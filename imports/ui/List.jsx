import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
// collection
import { Lists } from '../api/lists'
import { Users } from '../api/users'
// components
import { User } from './User'
import { MultiSelect } from '../components/inputs/MultiSelect'

export class List extends Component {
  // b/c this is a state class component, we need this
  constructor(props) {
    super(props)

    this.state = {
      isAddingUsers: false
    }

    this.addUsers = this.addUsers.bind(this)
    this.addUserToList = this.addUserToList.bind(this)
  }

  componentDidMount() {
    $('.tooltipped').tooltip({delay: 50})
  }

  componentWillUnmount() {
    $('.tooltipped').tooltip('remove')
  }

  renderUsers(users, listId) {
    return users.map((user) => {
      return <User key={ user.userId } user={ user } listId={ listId } />
    })
  }

  deleteList() {
    Meteor.call('lists.remove', this.props.list._id)
  }

  addUsers() {
    this.setState({isAddingUsers: true})
  }

  getOptionsForUserSelect() {
    return this.props.users.map((user) => {
      return {
        value: user._id,
        placeholder: user.username
      }
    })
  }

  // takes an arr of user _ids
  addUserToList(userIds) {
    Meteor.call('lists.addUsers', this.props.list._id, userIds)
    // reset the state which will ge the MultiSelect off dom
    this.setState({isAddingUsers: false})
  }

  render() {
    const listId = this.props.list._id
    const users = this.props.list.users
    // HACK: im calling this a hack b/c it took a year to
    // piece together, but its actually quite clever
    let renderMultiSelect = undefined
    if (this.state.isAddingUsers) {
      renderMultiSelect = <MultiSelect
        placeholder='Choose user(s) to add'
        label='Share list'
        onSubmit={ this.addUserToList }
        options={ this.getOptionsForUserSelect() }
        submitPrompt='Add'
      />
    }

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

          { this.renderUsers(users, listId) }

        </ul>

        <div className='margin-left-15'>

          { !this.state.isAddingUsers &&

            <a className='clickable' onClick={ this.addUsers }>add users to list</a>

          }

          { this.props.isLoading ?

            <p>fetching users...</p> :

            renderMultiSelect

          }

        </div>

      </li>
    )
  }
}

List.propTypes = {
  list: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  isLoading: PropTypes.bool
}

// params expects an arr of user _ids
export default ListContainer = createContainer(({ params }) => {
  const userQuery = {
    _id: {
      $nin: params
    }
  }
  const userSubscription = Meteor.subscribe('users')
  const isLoading = !userSubscription.ready()
  const users = Users.find(userQuery).fetch()

  return { isLoading, users }
}, List)
